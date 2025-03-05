import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Transform keys of an object to lowercase and replace spaces with underscores
 * @param {Object} data - The object to transform
 * @returns {Object} - The transformed object
 */
const transformKeysToUnderscores = ({data}) => {
  if(!data) {
    return;
  };

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key.replace(/([A-Z])/g, '_$1').toLowerCase(),
      value
    ])
  );
}

/**
 * Transform keys of an object to camel case
 * @param {Object} data - The object to transform
 * @returns {Object} - The transformed object
 */
const transformKeysToCamelCase = ({data}) => {
  if(!data) {
    return;
  };

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
      value
    ])
  );
}

/**
 * Get the user's IP address and geolocation information
 * @returns {Promise<Object>} - Object containing IP and geo data
 */
const getIpAndGeoData = async () => {
  try {
    // Get IP address using a public API
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    // Get geolocation data using IP
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoResponse.json();

    // Get browser information
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return {
      ipAddress: ip,
      geoCountry: geoData.country_name,
      geoRegion: geoData.region,
      geoCity: geoData.city,
      geoLatitude: geoData.latitude,
      geoLongitude: geoData.longitude,
      geoTimezone: timeZone,
      browserInfo: userAgent,
      geoLanguage: language
    };
  } catch (error) {
    console.error('Error getting IP/Geo data:', error);
    return {};
  }
};

/**
 * Upsert a survival plan to the 'survival_plans' table with IP and geo information
 * @param {Object} plan - The survival plan object to save
 * @returns {Promise} - The result of the upsert operation
 */
const upsertPlan = async ({plan}) => {
  try {
    // Get IP and geo data
    const ipGeoData = await getIpAndGeoData();

    // Prepare the plan data with IP and geo information
    const enrichedPlan = {
      ...transformKeysToUnderscores({data: plan}),
      ...transformKeysToUnderscores({data: ipGeoData}),
    };

    const { data, error } = await supabaseClient
      .from('survival_plans')
      .upsert(enrichedPlan, {
        onConflict: 'id',
        returning: 'minimal' // Only return the minimal data needed
      });

    if (error) throw error;

    return transformKeysToCamelCase({data});
  } catch (error) {
    console.error('Error upserting plan:', error);
    return { data: null, error };
  }
};

/**
 * Delete a survival plan from the 'survival_plans' table
 * @param {string} id - The ID of the plan to delete
 * @returns {Promise} - The result of the delete operation
 */
const deletePlan = async ({id}) => {
  try {
    const { data, error } = await supabaseClient
      .from('survival_plans')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error deleting plan:', error);
    return { data: null, error };
  }
};

/**
 * Fetch all survival plans for a user
 * @param {string} userId - The ID of the user
 * @returns {Promise} - The result of the fetch operation
 */
const getUserPlans = async ({userId}) => {
  try {
    const { data, error } = await supabaseClient
      .from('survival_plans')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) throw error;

    return { data: transformKeysToCamelCase({data}), error: null };
  } catch (error) {
    console.error('Error fetching user plans:', error);
    return { data: null, error };
  }
};

/**
 * Fetch a specific plan by ID
 * @param {string} id - The ID of the plan to fetch
 * @returns {Promise} - The result of the fetch operation
 */
const getPlanById = async ({id}) => {
  try {
    const { data, error } = await supabaseClient
      .from('survival_plans')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data: transformKeysToCamelCase({data}), error: null };
  } catch (error) {
    console.error('Error fetching plan:', error);
    return { data: null, error };
  }
};

const supabase = {
  upsertPlan,
  deletePlan,
  getUserPlans,
  getPlanById
}

export default supabase;
