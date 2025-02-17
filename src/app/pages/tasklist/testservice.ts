import { Concept, CreateTheConnectionLocal, FreeschemaQuery, GetTheConceptLocal, LocalSyncData, MakeTheInstanceConceptLocal, MakeTheTypeConceptApi } from "mftsccs-browser";
import { types } from "util";

export async function createFakeData(mainDataCount: number = 100, internalDataCount:number = 10){
    let mainArray:any[] = [];
    console.time("start");
    for(let i=0; i<mainDataCount; i++){
        let randomEntityType = "the_" + makeFakeData(5);
        let userId = 10267;
        let sessionId = 999;
        let accessId = 4;
        let order = 1000;
        let mainEntity:Concept = await MakeTheInstanceConceptLocal(randomEntityType, "", true, userId, sessionId, userId );
        let testData:any = {};
        testData.mainEntity = mainEntity;
        testData.mainEntityId = mainEntity.id;
        testData.values = [];
        for(let i=0; i<internalDataCount; i++){

            let randomData  = makeFakeData(5);
            let randomDataType = "the_" + randomData;
            let randomValueType = makeFakeData(5);
            let typeString = randomEntityType + "_" + randomData;
            if(i==0){
                randomData = "test";
                randomDataType = "the_test";
                typeString = "the_testing_test";
            }
            let randomDataJson:any = {};
            randomDataJson.connectionType = typeString;
            randomDataJson.type = randomDataType;
            randomDataJson.value = randomValueType;
            testData.values.push(randomDataJson);
            testData.randomDataType = randomDataType;
            let dataEntity:Concept = await MakeTheInstanceConceptLocal(randomDataType, randomValueType, false, userId, accessId, sessionId);
            let connectionType:Concept = await MakeTheTypeConceptApi(typeString, userId);
            let dataConnection = CreateTheConnectionLocal(mainEntity.id, dataEntity.id,connectionType.id, order, typeString, userId );
        }
        mainArray.push(testData);

    }
   await LocalSyncData.SyncDataOnline();
    console.timeEnd("start");
    // for(let i=0; i<mainArray.length; i++){
    //     let upperSelector:FreeschemaQuery = new FreeschemaQuery();
    //     upperSelector.name = "topselector";
    //     upperSelector.typeConnection = "the_testing_test";
    //     let myselectors:string[] = [];
    //     for(let j=0; j<mainArray[i].values.length; i++){
    //         let conType = mainArray[i].values[j].connectionType;
    //         myselectors.push(conType);
    //     }
    //     upperSelector.selectors = myselectors;

    //     let localConcept:Concept = await GetTheConceptLocal(mainArray[i].mainEntityId);
    //     let query:FreeschemaQuery= new FreeschemaQuery();
    //     query.conceptIds = [localConcept.id];
    //     query.name = "top";
    // }



}


function makeFakeData(length:number = 10) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

console.log(makeFakeData(5));