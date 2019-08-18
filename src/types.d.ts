export type TAskFor =  'APP_TOKEN' | 'EMAIL' | 'PASSWORD' | 'DELETE';

export interface IData {
    APP_TOKEN?: string;
    EMAIL?: string;
    PASSWORD?: string;
    AUTH_TOKEN?: string;
}

export interface IAuth {
    APP_TOKEN: string;
    EMAIL: string;
    PASSWORD: string;
}

export interface IUserWithAuthToken {
    id?: number;
    name?: string;
    last_activity?: string;
    auth_token?: string;
}

export interface IReport {
        id: number;
        name: string;
        last_activity: string;
        duration: string;
        activity_percent: number;
        tasks_duration: number;
        dates: [
          {
            date: string;
            duration: string;
            activity_percent: number;
            tasks_duration: number;
            users: [
              {
                id: number;
                name: string;
                last_activity: string;
                duration: string;
                activity_percent: number;
                tasks_duration: number;
                projects: [
                  {
                    id: number;
                    name: string;
                    last_activity: string;
                    duration: string;
                    activity_percent: number;
                    tasks_duration: number;
                    tasks: [
                      {
                        id: number;
                        integration_id: number;
                        summary: string;
                        details: string;
                        remote_id: string;
                        remote_alternate_id: string;
                        duration: string
                      }
                    ];
                    notes: [
                      {
                        id: number;
                        description: string;
                        task_id: number
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
}