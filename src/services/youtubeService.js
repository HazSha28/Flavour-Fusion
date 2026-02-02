// src/services/youtubeService.js
// YouTube API Service for Recipe Search

const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || 'AIzaSyBbp7nGo070rwHatQhCgZx-29eGzb0WfMg'; // Use same key for demo

/**
 * Search for recipe videos on YouTube
 * @param {string} query - Search query for recipes
 * @param {number} maxResults - Maximum number of results (default: 10)
 * @returns {Promise<Array>} - Array of recipe videos
 */
export async function searchRecipeVideos(query, maxResults = 10) {
  try {
    const searchQuery = `${query} recipe cooking tutorial`;
    
    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(searchQuery)}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message || 'YouTube API error');
    }
    
    // Format the results
    const videos = data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      source: 'youtube'
    }));
    
    return videos;
  } catch (error) {
    console.error('Error searching YouTube videos:', error);
    throw error;
  }
}

/**
 * Get video details by ID
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<Object>} - Video details
 */
export async function getVideoDetails(videoId) {
  try {
    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message || 'YouTube API error');
    }
    
    const item = data.items[0];
    if (!item) {
      throw new Error('Video not found');
    }
    
    return {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      duration: item.contentDetails.duration,
      viewCount: item.statistics.viewCount,
      likeCount: item.statistics.likeCount,
      url: `https://www.youtube.com/watch?v=${item.id}`,
      source: 'youtube'
    };
  } catch (error) {
    console.error('Error getting video details:', error);
    throw error;
  }
}

/**
 * Format YouTube video to recipe format
 * @param {Object} video - YouTube video object
 * @returns {Object} - Formatted recipe object
 */
export function formatVideoToRecipe(video) {
  // Extract duration from ISO 8601 format (PT4M30S -> 4 min 30 sec)
  const duration = video.duration ? parseDuration(video.duration) : 'Unknown';
  
  return {
    id: `youtube-${video.id}`,
    title: video.title,
    subtitle: `Video by ${video.channelTitle}`,
    image: video.thumbnail,
    category: 'Video Recipe',
    area: 'YouTube',
    difficulty: 'Medium', // Default since we can't determine from video
    rating: 4.0, // Default rating
    time: duration,
    cookTime: duration,
    prepTime: 'Video tutorial',
    servings: 'Video recipe',
    source: 'youtube',
    summary: video.description ? video.description.substring(0, 200) + '...' : 'Watch this recipe tutorial on YouTube',
    ingredients: [], // Not available from YouTube API
    steps: [], // Not available from YouTube API
    nutrition: null, // Not available from YouTube API
    tips: ['Follow along with the video tutorial', 'Pause and replay as needed'],
    youtube: video.url,
    videoId: video.id,
    channelTitle: video.channelTitle,
    viewCount: video.viewCount,
    publishedAt: video.publishedAt
  };
}

/**
 * Parse YouTube duration format (PT4M30S) to readable format
 * @param {string} duration - ISO 8601 duration
 * @returns {string} - Readable duration
 */
function parseDuration(duration) {
  if (!duration) return 'Unknown';
  
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 'Unknown';
  
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Search for recipes with fallback to TheMealDB if YouTube fails
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Promise<Array>} - Combined results
 */
export async function searchRecipesWithYouTube(query, options = {}) {
  const { includeYouTube = true, includeMealDB = true, maxResults = 10 } = options;
  
  const results = [];
  
  try {
    // Search YouTube videos
    if (includeYouTube) {
      const youtubeVideos = await searchRecipeVideos(query, Math.ceil(maxResults / 2));
      const formattedVideos = youtubeVideos.map(video => formatVideoToRecipe(video));
      results.push(...formattedVideos);
    }
  } catch (error) {
    console.warn('YouTube search failed, continuing with other sources:', error.message);
  }
  
  try {
    // Search TheMealDB as fallback
    if (includeMealDB) {
      const { searchMealsByName, formatMealToRecipe } = await import('./mealdbService.js');
      const mealDbResults = await searchMealsByName(query);
      const formattedMeals = mealDbResults.map(meal => formatMealToRecipe(meal)).filter(Boolean);
      results.push(...formattedMeals);
    }
  } catch (error) {
    console.warn('TheMealDB search failed:', error.message);
  }
  
  // Remove duplicates and limit results
  const uniqueResults = results.filter((recipe, index, self) => 
    index === self.findIndex(r => r.title.toLowerCase() === recipe.title.toLowerCase())
  );
  
  return uniqueResults.slice(0, maxResults);
}
