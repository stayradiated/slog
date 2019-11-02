import chalk, { Chalk } from 'chalk'
import { DateTime } from 'luxon'

enum STATE {
  PENDING,
  COMPLETED,
  FAILED,
}

const slog = async <T>(
  message: string,
  promise: Promise<T>,
  delay: number = 1,
): Promise<T> => {
  const startTime = DateTime.local()

  let nextTimeout: NodeJS.Timeout

  const logState = (state: STATE) => {
    clearTimeout(nextTimeout)

    const now = DateTime.local()
    const diff = now.diff(startTime)
    const duration = diff.toFormat('mm:ss')

    const [color, stateMsg] = ((): [Chalk, string] => {
      switch (state) {
        case STATE.PENDING:
          return [chalk.grey, '']
        case STATE.COMPLETED:
          return [chalk.green, chalk.green('✓')]
        case STATE.FAILED:
          return [chalk.red, chalk.red('✗')]
        default:
          return [chalk.blue, '?? unknown state']
      }
    })()

    console.info(color(`${message} (${duration}) ${stateMsg}`))

    if (state === STATE.PENDING) {
      nextTimeout = setTimeout(() => logState(STATE.PENDING), delay)
    }
  }
  logState(STATE.PENDING)

  try {
    const result = await promise
    logState(STATE.COMPLETED)
    return result
  } catch (error) {
    logState(STATE.FAILED)
    throw error
  }
}

export default slog
