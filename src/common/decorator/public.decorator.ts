import { SetMetadata } from '@nestjs/common';

/**
 * Decorator to Allow Public routes without Auth restrictions.
 */
export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
