import { createClient } from '@supabase/supabase-js';

export const createSuperAdminClient = () => {
	return createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
		{
			auth: {
				persistSession: false,
				autoRefreshToken: false,
				detectSessionInUrl: false,
			},
		}
	);
};
