import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth functions
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data?.user, error };
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data?.session, error };
};

// User data functions
export const saveUserProfile = async (userId, userData) => {
  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: userId,
      ...userData,
      updated_at: new Date().toISOString(),
    })
    .select();
  return { data, error };
};

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return { profile: data, error };
};

// Questionnaire functions
export const saveUserQuestionnaire = async (userId, questionnaireData) => {
  const { data, error } = await supabase
    .from("questionnaires")
    .upsert({
      user_id: userId,
      ...questionnaireData,
      updated_at: new Date().toISOString(),
    })
    .select();
  return { data, error };
};

export const getUserQuestionnaire = async (userId) => {
  const { data, error } = await supabase
    .from("questionnaires")
    .select("*")
    .eq("user_id", userId)
    .single();
  return { data, error }; // Added error to return
};

// Skin Analysis functions
export const saveUserSkinAnalysis = async (userId, analysisData) => {
  const { data, error } = await supabase
    .from("skin_analyses")
    .upsert({
      user_id: userId,
      ...analysisData,
      created_at: new Date().toISOString(),
    })
    .select();
  return { data, error };
};

export const getUserSkinAnalysis = async (userId) => {
  const { data, error } = await supabase
    .from("skin_analyses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  return { data, error }; // Added error to return
};

export const getUserRecommendations = async (userId) => {
  const { data, error } = await supabase
    .from("skin_analyses")
    .select("recommendations")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  return { data, error }; // Added error to return
};
