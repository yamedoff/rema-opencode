import { describe, expect } from "bun:test"
import { Effect } from "effect"

import { REMA_BRIDGE_AUTH_MESSAGE, REMA_MODEL_REF } from "../../src/cli/cmd/rema-mode"
import { cliIt } from "../lib/cli-process"

const BRIDGE_ENV = { REMA_TRANSPORT: "bridge" }

describe("Rema bridge CLI command guards", () => {
  cliIt.live(
    "models lists only the Rema bridge model",
    ({ opencode }) =>
      Effect.gen(function* () {
        const result = yield* opencode.spawn(["models"], { env: BRIDGE_ENV })
        opencode.expectExit(result, 0, "models")
        expect(result.stdout.trim()).toBe(REMA_MODEL_REF)
      }),
    60_000,
  )

  cliIt.live(
    "models rejects non-Rema provider filters",
    ({ opencode }) =>
      Effect.gen(function* () {
        const result = yield* opencode.spawn(["models", "openai"], { env: BRIDGE_ENV })
        opencode.expectExit(result, 1, "models openai")
        expect(result.stderr).toContain("Provider not available in Rema bridge mode: openai")
      }),
    60_000,
  )

  for (const argv of [
    ["providers", "list"],
    ["providers", "login"],
    ["providers", "logout"],
    ["console", "login"],
    ["console", "logout"],
    ["console", "switch"],
    ["console", "orgs"],
    ["console", "open"],
  ]) {
    cliIt.live(
      `${argv.join(" ")} uses the Rema bridge notice`,
      ({ opencode }) =>
        Effect.gen(function* () {
          const result = yield* opencode.spawn(argv, { env: BRIDGE_ENV })
          opencode.expectExit(result, 0, argv.join(" "))
          expect(result.stdout).toContain(REMA_BRIDGE_AUTH_MESSAGE)
        }),
      60_000,
    )
  }
})
