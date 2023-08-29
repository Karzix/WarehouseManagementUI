export class User {
      id: string|undefined
      userName: string|undefined
      normalizedUserName: string|undefined
      email: string|undefined
      normalizedEmail: string|undefined
      emailConfirmed: boolean|undefined
      passwordHash: string|undefined
      securityStamp: string|undefined
      concurrencyStamp: string|undefined
      phoneNumber: string|undefined
      phoneNumberConfirmed: boolean|unknown
      twoFactorEnabled: boolean|unknown
      lockoutEnd: string|unknown
      lockoutEnabled: boolean|unknown
      accessFailedCount: string|unknown
}