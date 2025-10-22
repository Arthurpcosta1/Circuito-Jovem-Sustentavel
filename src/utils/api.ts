import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-7af4432d`;

// Helper para fazer requisições à API
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`,
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Tentar fazer parse do JSON
    let data;
    try {
      const text = await response.text();
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error(`JSON parse error calling ${endpoint}:`, parseError);
      throw new Error('Erro ao processar resposta do servidor');
    }

    if (!response.ok) {
      console.error(`API Error (${endpoint}):`, data);
      throw new Error(data.error || `Erro ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error(`Network error calling ${endpoint}:`, error);
    throw error;
  }
}

// ============================================
// API - USUÁRIOS
// ============================================

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  universidade: string;
  curso: string;
  chaves_impacto: number;
  nivel: string;
  total_coletas: number;
  kg_reciclados: number;
  is_embaixador: boolean;
  created_at: string;
  updated_at: string;
}

export async function criarUsuario(dados: {
  nome: string;
  email: string;
  senha: string;
  universidade?: string;
  curso?: string;
}) {
  return apiRequest('/usuarios', {
    method: 'POST',
    body: JSON.stringify(dados),
  });
}

export async function loginUsuario(email: string, senha: string) {
  return apiRequest('/usuarios/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha }),
  });
}

export async function buscarUsuario(id: string) {
  return apiRequest(`/usuarios/${id}`);
}

export async function atualizarUsuario(id: string, dados: Partial<Usuario>) {
  return apiRequest(`/usuarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  });
}

// ============================================
// API - EMBAIXADORES
// ============================================

export interface Embaixador {
  id: string;
  usuario_id: string;
  estacao_id: string;
  validacoes_realizadas: number;
  data_inicio: string;
  status: string;
  created_at: string;
}

export async function criarEmbaixador(usuario_id: string, estacao_id: string) {
  return apiRequest('/embaixadores', {
    method: 'POST',
    body: JSON.stringify({ usuario_id, estacao_id }),
  });
}

export async function buscarEmbaixadorPorUsuario(usuario_id: string) {
  return apiRequest(`/embaixadores/usuario/${usuario_id}`);
}

// ============================================
// API - INSTITUIÇÕES
// ============================================

export interface Instituicao {
  id: string;
  nome: string;
  tipo: string;
  endereco: string;
  cidade: string;
  estado: string;
  created_at: string;
}

export async function listarInstituicoes() {
  return apiRequest('/instituicoes');
}

export async function buscarInstituicao(id: string) {
  return apiRequest(`/instituicoes/${id}`);
}

// ============================================
// API - ESTAÇÕES
// ============================================

export interface Estacao {
  id: string;
  instituicao_id: string;
  nome: string;
  endereco: string;
  latitude: number;
  longitude: number;
  tipos_materiais: string[];
  horario_funcionamento: string;
  status: string;
  created_at: string;
}

export async function listarEstacoes() {
  return apiRequest('/estacoes');
}

export async function buscarEstacao(id: string) {
  return apiRequest(`/estacoes/${id}`);
}

// ============================================
// API - COLETAS
// ============================================

export interface Coleta {
  id: string;
  usuario_id: string;
  estacao_id: string;
  tipo_material: string;
  quantidade_kg: number;
  foto_url?: string;
  status: 'pendente' | 'validada' | 'rejeitada';
  chaves_ganhas: number;
  validada_por_embaixador_id: string | null;
  data_validacao: string | null;
  created_at: string;
}

export async function criarColeta(dados: {
  usuario_id: string;
  estacao_id: string;
  tipo_material: string;
  quantidade_kg: number;
  foto_url?: string;
}) {
  return apiRequest('/coletas', {
    method: 'POST',
    body: JSON.stringify(dados),
  });
}

export async function validarColeta(
  coleta_id: string,
  embaixador_id: string,
  aprovado: boolean,
  quantidade_kg_validada?: number
) {
  return apiRequest(`/coletas/${coleta_id}/validar`, {
    method: 'POST',
    body: JSON.stringify({ embaixador_id, aprovado, quantidade_kg_validada }),
  });
}

export async function listarColetasUsuario(usuario_id: string) {
  return apiRequest(`/coletas/usuario/${usuario_id}`);
}

export async function listarColetasPendentes() {
  return apiRequest('/coletas/pendentes');
}

// ============================================
// API - COMÉRCIOS
// ============================================

export interface Comercio {
  id: string;
  nome: string;
  categoria: string;
  endereco: string;
  cidade: string;
  estado: string;
  logo_url: string;
  descricao: string;
  created_at: string;
}

export async function listarComercios() {
  return apiRequest('/comercios');
}

export async function buscarComercio(id: string) {
  return apiRequest(`/comercios/${id}`);
}

// ============================================
// API - VANTAGENS
// ============================================

export interface Vantagem {
  id: string;
  comercio_id: string;
  titulo: string;
  descricao: string;
  chaves_necessarias: number;
  categoria: string;
  validade_dias: number;
  estoque_disponivel: number;
  termos: string;
  status: string;
  created_at: string;
}

export async function listarVantagens() {
  return apiRequest('/vantagens');
}

export async function buscarVantagem(id: string) {
  return apiRequest(`/vantagens/${id}`);
}

// ============================================
// API - RESGATES
// ============================================

export interface Resgate {
  id: string;
  usuario_id: string;
  vantagem_id: string;
  codigo_resgate: string;
  chaves_gastas: number;
  status: 'ativo' | 'utilizado' | 'expirado';
  data_resgate: string;
  data_expiracao: string;
  data_utilizacao: string | null;
  created_at: string;
  vantagem?: Vantagem;
}

export async function resgatarVantagem(usuario_id: string, vantagem_id: string) {
  return apiRequest('/resgates', {
    method: 'POST',
    body: JSON.stringify({ usuario_id, vantagem_id }),
  });
}

export async function listarResgatesUsuario(usuario_id: string) {
  return apiRequest(`/resgates/usuario/${usuario_id}`);
}

export async function utilizarResgate(resgate_id: string) {
  return apiRequest(`/resgates/${resgate_id}/utilizar`, {
    method: 'POST',
  });
}

// ============================================
// API - RANKING
// ============================================

export interface RankingUsuario {
  posicao: number;
  id: string;
  nome: string;
  chaves_impacto: number;
  nivel: string;
  total_coletas: number;
  kg_reciclados: number;
}

export async function buscarRanking(cidade?: string, limit?: number) {
  const params = new URLSearchParams();
  if (cidade) params.append('cidade', cidade);
  if (limit) params.append('limit', limit.toString());
  
  const query = params.toString() ? `?${params.toString()}` : '';
  return apiRequest(`/ranking${query}`);
}

// ============================================
// API - ESTATÍSTICAS
// ============================================

export interface Estatisticas {
  total_usuarios: number;
  total_coletas: number;
  total_kg_reciclados: number;
  total_estacoes: number;
  total_resgates: number;
  total_chaves_distribuidas: number;
  coletas_pendentes: number;
}

export async function buscarEstatisticas() {
  return apiRequest('/estatisticas');
}

// ============================================
// AUTH HELPER
// ============================================

export const auth = {
  async signIn(email: string, password: string) {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha: password }),
    });
    
    // Store user data in localStorage for session persistence
    if (response.user) {
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
      }
    }
    
    return response;
  },

  async signUp(dados: {
    email: string;
    password: string;
    nome: string;
    telefone?: string;
    universidade?: string;
    curso?: string;
    tipo?: string;
  }) {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: dados.email,
        senha: dados.password,
        nome: dados.nome,
        telefone: dados.telefone,
        tipo: dados.tipo || 'estudante',
      }),
    });
    
    // Store user data in localStorage for session persistence
    if (response.user) {
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      
      // Fazer login automaticamente após registro
      const loginResponse = await auth.signIn(dados.email, dados.password);
      return loginResponse;
    }
    
    return response;
  },

  async signOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) return null;
    
    const user = JSON.parse(userStr);
    
    // Carregar foto do localStorage se existir
    const savedPhoto = localStorage.getItem(`profile_photo_${user.id || 'default'}`);
    if (savedPhoto) {
      user.foto_url = savedPhoto;
    }
    
    return user;
  },

  updateCurrentUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
};
