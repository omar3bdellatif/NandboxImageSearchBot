const { createRequire } = require("module");
const NandBox = require("nandbox-bot-api/src/NandBox");
const Nand = require("nandbox-bot-api/src/NandBoxClient");
const NandBoxClient = Nand.NandBoxClient;
const TextOutMessage = require("nandbox-bot-api/src/outmessages/TextOutMessage");
const InlineSearchAnswer = require("nandbox-bot-api/src/outmessages/InlineSearchAnswer")
const Result = require("nandbox-bot-api/src/data/Result")
const Chat = require("nandbox-bot-api/src/data/Chat")
const gis = require('g-i-s');


const Utils = require("nandbox-bot-api/src/util/Utility");
const Id = Utils.Id;



//Bot related
const configFile = require("./config.json");
const TOKEN = configFile.TOKEN.toString();
const config = {
    URI: configFile.URI,
    DownloadServer: configFile.DownloadServer,
    UploadServer: configFile.UploadServer
}

var client = NandBoxClient.get(config);
var nandbox = new NandBox();
var nCallBack = nandbox.Callback;
var api = null;


nCallBack.onConnect = (_api) => {
    // it will go here if the bot connected to the server successfuly 
    api = _api;
    console.log("Authenticated");

    
}

nCallBack.onReceive = incomingMsg => {
}

// implement other nandbox.Callback() as per your bot need
nCallBack.onReceiveObj = obj => {
    console.log("received object: ", obj);
}

nCallBack.onClose = () => { }
nCallBack.onError = () => { }




nCallBack.onChatMenuCallBack = chatMenuCallback => {

}





nCallBack.onInlineMessageCallback = inlineMsgCallback => {
    
}
nCallBack.onMessagAckCallback = msgAck => {}

nCallBack.onUserJoinedBot = user => {
}

nCallBack.onChatMember = chatMember => {}


nCallBack.onChatAdministrators = chatAdministrators => {}


nCallBack.userStartedBot = user => { }
nCallBack.onMyProfile = user => { }
nCallBack.onUserDetails = user => { }
nCallBack.userStoppedBot = user => { }
nCallBack.userLeftBot = user => { }
nCallBack.permanentUrl = permenantUrl => { }
nCallBack.onChatDetails = chat => { }
nCallBack.onInlineSearh = inlineSearch => { 
    let chatId = inlineSearch.chat.id;
    let userId = inlineSearch.from.id;
    let keywords = inlineSearch.keywords;
    let searchId = inlineSearch.search_id;

    if(keywords.length !== 0 && keywords.trim().length !== 0)
    {
        let inlineSearchAnswer = new InlineSearchAnswer();
        inlineSearchAnswer.chat = new Chat(inlineSearch.chat);
        inlineSearchAnswer.chat.id = inlineSearch.chat.id;
        inlineSearchAnswer.to_user_id = userId;
        inlineSearchAnswer.next_offset = ""
        inlineSearchAnswer.search_id = searchId
    
    
        
        gis(keywords, logResults);
    
        function logResults(error, results) {
          if (error) {
            return console.log("error");
          }
          else {
    
            for(i = 0;i<results.length;i++)
            {
                let resultsArr = []
                let result = new Result();
                result.type = "image"
                result.url = decodeURIComponent(JSON.parse('"'+results[i].url+'"'))
                result.thumb_url = decodeURIComponent(JSON.parse('"'+results[i].url+'"'))
                resultsArr.push(result)
                inlineSearchAnswer.results = resultsArr
                api.send((JSON.stringify(inlineSearchAnswer)))
                
            }
            
          }
            
        }
    }
    

    
    
    
}
nCallBack.onBlackList = blackList => { }
nCallBack.onWhiteList = whiteList => { }

client.connect(TOKEN, nCallBack);