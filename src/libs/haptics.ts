import { Presets, Settings } from 'react-native-pulsar'

Settings.enableSound(false)

const HAPTICS = {
  bookmark: Presets.ping,
  selection: Presets.System.selection,
  tap: Presets.System.impactSoft,
  start: Presets.spark,
  scan: Presets.sonar,
  // scan: Presets.cameraShutter,
  success: Presets.System.notificationSuccess,
  error: Presets.System.notificationError,
  warning: Presets.System.notificationWarning,
} as const

export type HapticName = keyof typeof HAPTICS

export function haptic(name: HapticName) {
  HAPTICS[name]()
}
