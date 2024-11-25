import { IAiResponse, IMessageToAi } from '../models/ai.models';
import { AiRoute } from '../enums/ai-route.enum';
import { delay, Observable, of } from 'rxjs';

const DELAY = 500;

export function sendMessage(route: AiRoute, message: IMessageToAi): Observable<IAiResponse> {
    // return this.http.post<IAiResponse>(this.basePath + route, {
    //   context: message.context,
    //   message: message.text,
    // });

    const response: IAiResponse = {
        message: 'Test message lorem ipsum how are you doing? Hey my name is ni pro sho.',
        options: [
            { name: 'How do you envision AI-driven project management tools transforming the way you plan, execute, and monitor projects?' },
            { name: 'What challenges do you foresee in integrating AI into your current project management workflows, and how do you plan to address them?' },
            // { name: 'test' }
        ]
    }
    return of(response).pipe(delay(DELAY));
}