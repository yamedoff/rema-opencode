export const REMA_PROVIDER_ID = "rema"
export const REMA_MODEL_ID = "rema-agent"
export const REMA_MODEL_REF = `${REMA_PROVIDER_ID}/${REMA_MODEL_ID}`

export function remaBridgeModeEnabled() {
  return process.env.REMA_TRANSPORT === "bridge" || process.env.OPENCODE_REMA_TRANSPORT === "bridge"
}

export function remaModelSelection() {
  return {
    providerID: REMA_PROVIDER_ID,
    modelID: REMA_MODEL_ID,
  }
}
