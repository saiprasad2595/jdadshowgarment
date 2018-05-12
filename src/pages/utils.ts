export function loadChatBot() {
    return new Promise(function (resolve, reject) {
        var chat = document.createElement('script');
        chat.src = "https://chat.botplatform.io/plugin-v2.js?bot=bot_1517396902537";
        chat.type = "text/javascript";
        chat.onload = resolve;
        chat.onerror = reject;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(chat);
    }).catch(function (err) {
        console.log(err);
    });
}
export interface IChatBotDetails {
    access_token: string;
    userId: number;
    name: string;
}
export function initializeChatBot(chatBotDetails: IChatBotDetails): any {
    loadChatBot().then(function () {
        // tslint:disable-next-line:max-line-length
        eval("window.botplatform.init({ botPayload:chatBotDetails.access_token,autoOpen: false,userId: chatBotDetails.userId,name:chatBotDetails.name})");

    }).catch(function (err) {
        alert('Some error occured while loading chat bot');
        console.log(err);
    });

}
export function terminateChatBot(): any {
    let divCircle = document.getElementById("ymDivCircle");
    let chatBox = document.getElementById("ymFrameHolder");
    if (divCircle) {
        (<any>window).botplatform = null;
        document.getElementById("ymDivCircle").style.display = 'none';
    }
    if (chatBox) {
        document.getElementById("ymFrameHolder").style.display = 'none';
    }
}
