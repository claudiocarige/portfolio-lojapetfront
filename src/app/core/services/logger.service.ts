import { Injectable } from '@angular/core';

export type LogLevel = 'INFO' | 'WARN' | 'ERROR';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  log(level: LogLevel, context: string, message: string, data?: any): void {
    const timestamp = this.getTimestamp();
    const logMessage = `[${timestamp}] [${level}] [${context}] ${message}`;

    if (data) {
      console.log(logMessage, data);
    } else {
      console.log(logMessage);
    }
  }

  info(context: string, message: string, data?: any): void {
    this.log('INFO', context, message, data);
  }

  warn(context: string, message: string, data?: any): void {
    this.log('WARN', context, message, data);
  }

  error(context: string, message: string, data?: any): void {
    this.log('ERROR', context, message, data);
  }
}
