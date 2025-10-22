import { projectId, publicAnonKey } from './supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-7af4432d`;

// Helper para fazer requisições à API
async function apiRequest(
  endpoint: string, 
  options: RequestInit = {}, 
  requiresAuth: boolean = false
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };

  // Adicionar token de autenticação se necessário
  if (requiresAuth) {
    const token = localStorage.getItem('access_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  } else {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
    throw new Error(error.error || `Erro ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// ========== AUTENTICAÇÃO ==========

export async function register(nome: string, email: string, senha: string, telefone?: string) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ nome, email, senha, telefone, tipo: 'estudante' }),
  });
}

export async function login(email: string, senha: string) {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha }),
  });
  
  // Salvar token no localStorage
  if (response.access_token) {
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }
  
  return response;
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
}

export function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  const user = JSON.parse(userStr);
  return user;
}

export function updateCurrentUser(user: any) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function isAuthenticated() {
  return !!localStorage.getItem('access_token');
}

// ========== USUÁRIOS ==========

export async function getMyProfile() {
  return apiRequest('/users/me', {}, true);
}

export async function updateProfile(userId: string, profileData: any) {
  return apiRequest(`/users/${userId}/profile`, {
    method: 'PUT',
    body: JSON.stringify(profileData),
  }, true);
}

export async function updateUserKeys(userId: string, chaves: number) {
  return apiRequest(`/users/${userId}/chaves`, {
    method: 'PUT',
    body: JSON.stringify({ chaves }),
  }, true);
}

// ========== ESTAÇÕES ==========

export async function getStations() {
  return apiRequest('/estacoes', {}, false);
}

export async function createStation(station: any) {
  return apiRequest('/estacoes', {
    method: 'POST',
    body: JSON.stringify(station),
  }, true);
}

// ========== COLETAS ==========

export async function createCollection(estacao_id: string, peso_kg: number, material_tipo: string, observacoes?: string) {
  return apiRequest('/coletas', {
    method: 'POST',
    body: JSON.stringify({ estacao_id, peso_kg, material_tipo, observacoes }),
  }, true);
}

export async function getMyCollections() {
  return apiRequest('/coletas/me', {}, true);
}

// ========== RANKING ==========

export async function getRanking() {
  return apiRequest('/ranking', {}, false);
}

// ========== COMÉRCIOS E VANTAGENS ==========

export async function getStores() {
  return apiRequest('/comercios', {}, false);
}

export async function getBenefits() {
  return apiRequest('/vantagens', {}, false);
}

export async function redeemBenefit(vantagem_id: string) {
  return apiRequest('/resgates', {
    method: 'POST',
    body: JSON.stringify({ vantagem_id }),
  }, true);
}

export async function getMyRedemptions() {
  return apiRequest('/resgates/me', {}, true);
}

// ========== DADOS DE EXEMPLO ==========

export async function seedDatabase() {
  return apiRequest('/seed', {
    method: 'POST',
  }, false);
}
