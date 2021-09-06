module.exports.verification = function(text, secret_key) {

    const email = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            body {
                background: #161616;
            }
    
            .email {
                display: block;
                width: 600px;
                border-radius: 50px;
                height: 380px;
                background-color: #212121;
                text-align: center;
                margin-left:50px;
                margin-right: 50px;
                margin-top: 30px;
                margin-bottom: 0;
            }
        </style>
    </head>
    
    <body>
        <table style="border-collapse: collapse;">
            <tbody style="background: #161616;">
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>    <div class="row">
                        <div class="email">
                            <h1 style="color: #FFFFFF; margin: 15px 0;
                            font-family: sans-serif; font-weight: 400; font-size: 54px;
                            padding-top: 20px;">OutUp</h1>
                            <h5 style="color: #AAAAAA; font-family: sans-serif; font-weight: 400; font-size: 26px;">Your verification
                                code</h5>
                            <div style="margin-top: 10px;
                            margin-left: 100px;
                            margin-right: 100px;
                            margin-bottom: 10px; border-radius: 30px;
                            background-color: #161616;
                            padding: 10px;
                            border-style: none;
                            color: #FFFFFF;
                            font-size: 24px; font-family: sans-serif; font-weight: 400;">${secret_key}</div>
                        </div>
                    </div></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <p style="color: #FFFFFF; margin: 15px  0; text-align: center;
                        font-family: sans-serif; font-weight: 400; font-size: 16px;">${text}</p>
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    
    </html>`;
    
    return email;
};