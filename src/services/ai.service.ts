import { IAiMessage, IAiResponse } from '../models/ai.models';
import { concatMap, delay, from, map, Observable, of } from 'rxjs';

const DELAY = 500;
const API_URL = 'https://api.example.com'; // Replace with your actual API URL

export function sendMessage(message: IAiMessage): Observable<IAiResponse> {

    const path = API_URL + '/test-chat';
    const body = {
        context: message.context,
        message: message.text
    };

    const response = fetch(path, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return from(response).pipe(
        concatMap(x => x.json()),
        map((result: { message: string }) => {
            return {
                message: result.message,
                messageForOptions: '',
                options: []
            } as IAiResponse
        })
    );


    // MOCK DATA. Comment the code above and uncomment the code below:

    // const response: IAiResponse = {
    //     message: 'Test message lorem ipsum how are you doing? Hey my name is ni pro sho.',
    //     options: [
    //         { name: 'How do you envision AI-driven project management tools transforming the way you plan, execute, and monitor projects?' },
    //         { name: 'What challenges do you foresee in integrating AI into your current project management workflows, and how do you plan to address them?' },
    //         // { name: 'test' }
    //     ]
    // }
    // return of(response).pipe(delay(DELAY));
}
