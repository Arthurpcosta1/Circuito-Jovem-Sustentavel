import { createClient } from './supabase/client';
import { toast } from 'sonner@2.0.3';

/**
 * Faz upload da imagem de perfil para o Supabase Storage
 * @param file Arquivo de imagem
 * @param userId ID do usuário
 * @returns URL pública da imagem ou null em caso de erro
 */
export async function uploadProfileImage(file: File, userId: string): Promise<string | null> {
  try {
    const supabase = createClient();
    
    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione uma imagem válida');
      return null;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB');
      return null;
    }

    // Criar nome único para o arquivo
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `profile-images/${fileName}`;

    // Fazer upload para o Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('circuito-jovem')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error('Erro no upload:', uploadError);
      toast.error('Erro ao fazer upload da imagem');
      return null;
    }

    // Obter URL pública da imagem
    const { data: urlData } = supabase.storage
      .from('circuito-jovem')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Erro ao processar upload:', error);
    toast.error('Erro ao processar imagem');
    return null;
  }
}

/**
 * Atualiza a foto de perfil do usuário no banco de dados
 * @param userId ID do usuário
 * @param photoUrl URL da foto
 * @returns true se sucesso, false se erro
 */
export async function updateProfilePhoto(userId: string, photoUrl: string): Promise<boolean> {
  try {
    const supabase = createClient();
    
    const { error } = await supabase
      .from('usuarios_7af4432d')
      .update({ 
        foto_url: photoUrl,
        atualizado_em: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) {
      console.error('Erro ao atualizar foto no banco:', error);
      toast.error('Erro ao salvar foto no perfil');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao atualizar foto:', error);
    toast.error('Erro ao salvar foto');
    return false;
  }
}

/**
 * Carrega os dados do perfil do usuário do banco de dados
 * @param userId ID do usuário
 * @returns Dados do usuário ou null
 */
export async function loadUserProfile(userId: string) {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('usuarios_7af4432d')
      .select('*')
      .eq('id', userId)
      .maybeSingle(); // Mudado de .single() para .maybeSingle()

    if (error) {
      console.error('Erro ao carregar perfil:', error);
      return null;
    }

    // maybeSingle() retorna null se não houver dados, ao invés de dar erro
    return data;
  } catch (error) {
    console.error('Erro ao carregar perfil:', error);
    return null;
  }
}

/**
 * Atualiza os dados do perfil do usuário no banco de dados
 * @param userId ID do usuário
 * @param userData Dados para atualizar (pode incluir: nome, email, curso, periodo, etc.)
 * @returns true se sucesso, false se erro
 * 
 * IMPORTANTE: Se receber erro "Could not find the 'curso' column":
 * Execute o SQL em /EXECUTE_AGORA.sql para adicionar as colunas faltantes
 */
export async function updateUserProfile(userId: string, userData: any): Promise<boolean> {
  try {
    const supabase = createClient();
    
    const { error } = await supabase
      .from('usuarios_7af4432d')
      .update({ 
        ...userData,
        atualizado_em: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) {
      console.error('❌ Erro ao atualizar perfil:', error);
      
      // Mensagem específica para erro de coluna não encontrada
      if (error.message.includes('curso') || error.message.includes('periodo')) {
        console.error('💡 Solução: Execute o SQL em /EXECUTE_AGORA.sql para adicionar as colunas');
        toast.error('Erro: Execute a correção do banco de dados');
      } else {
        toast.error('Erro ao atualizar perfil');
      }
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    toast.error('Erro ao atualizar perfil');
    return false;
  }
}

/**
 * Cria ou sincroniza o usuário no banco de dados
 * @param userData Dados do usuário do localStorage
 * @returns true se sucesso, false se erro
 * 
 * IMPORTANTE: Se receber erro "new row violates row-level security policy":
 * Execute o SQL em /EXECUTE_AGORA.sql para corrigir as políticas RLS
 */
export async function ensureUserExists(userData: any): Promise<boolean> {
  try {
    if (!userData?.id) {
      console.error('Dados do usuário inválidos');
      return false;
    }

    const supabase = createClient();
    
    // Usar upsert para evitar erro de duplicate key
    // Isso cria o usuário se não existir, ou atualiza se já existir
    const { error } = await supabase
      .from('usuarios_7af4432d')
      .upsert({
        id: userData.id,
        nome: userData.nome || userData.name || 'Usuário',
        email: userData.email || '',
        senha_hash: '$2a$10$PLACEHOLDER_HASH_FROM_AUTH_SYSTEM', // Placeholder - senha gerenciada pelo sistema de auth
        tipo: userData.tipo || 'estudante',
        chaves_impacto: userData.chaves_impacto || 0,
        nivel: userData.nivel || 'Iniciante',
        foto_url: userData.foto_url || null,
        atualizado_em: new Date().toISOString()
      }, {
        onConflict: 'id', // Em caso de conflito no ID, atualiza o registro
        ignoreDuplicates: false // Não ignorar, sempre atualizar
      });

    if (error) {
      console.error('❌ Erro ao sincronizar usuário no banco:', error);
      
      // Mensagem específica para erro de RLS
      if (error.code === '42501' || error.message.includes('row-level security')) {
        console.error('💡 Solução: Execute o SQL em /EXECUTE_AGORA.sql para corrigir RLS');
        toast.error('Erro de permissão - Execute a correção do banco');
      }
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao sincronizar usuário:', error);
    return false;
  }
}

/**
 * Remove a foto de perfil antiga do storage
 * @param photoUrl URL da foto antiga
 */
export async function deleteOldProfilePhoto(photoUrl: string): Promise<void> {
  try {
    if (!photoUrl || !photoUrl.includes('profile-images/')) {
      return;
    }

    const supabase = createClient();
    
    // Extrair o caminho do arquivo da URL
    const urlParts = photoUrl.split('/profile-images/');
    if (urlParts.length < 2) return;
    
    const filePath = `profile-images/${urlParts[1]}`;
    
    await supabase.storage
      .from('circuito-jovem')
      .remove([filePath]);
  } catch (error) {
    console.error('Erro ao deletar foto antiga:', error);
  }
}
