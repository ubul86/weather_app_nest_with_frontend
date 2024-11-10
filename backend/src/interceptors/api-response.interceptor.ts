import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        if (response.statusCode >= 200 && response.statusCode < 300) {
          return {
            success: true,
            message: data.message || 'Request successful',
            data: data.data || data || null,
          };
        } else {
          return {
            success: false,
            message: data.message || 'An error occurred',
            errors: data.errors || null,
          };
        }
      }),
    );
  }
}
