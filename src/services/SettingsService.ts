import { Actor } from '../middleware/Auth';
import { UpdateSettingsRequest, UpdateSettingsRequestSchema } from '../requests/SettingsRequests';
import { findUserSettings, upsertUserSettings } from '../repositories/SettingsRepository';

export async function updateUserSettings(actor: Actor, request: UpdateSettingsRequest) {
	const data = UpdateSettingsRequestSchema.parse(request);
	return await upsertUserSettings(actor.id, data);
}

export function getUserSettings(actor: Actor) {
	return findUserSettings(actor.id);
}