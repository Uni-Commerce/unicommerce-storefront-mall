import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getIframe(): string {
    return `
      <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
          </head>
          <body>
            <script>
              (function() {
                'use strict';
                function redirect(errorMessage, successUrl) {
                  if (!!errorMessage.message) {
                    window.top.alert(errorMessage.message);
                  } else {
                    window.location.href = successUrl;
                  }
                }
                var errorMessage = {};
                var successUrl = 'http://127.0.0.1:3000/';
                redirect(errorMessage, successUrl);
            })();
            </script>
          </body>
        </html>
    `
  }
}
