import { BuildWidgetFromId, CreateTheCompositionLocal, DATAID, FilterSearch, FreeschemaQuery, GetCompositionFromConnectionsWithDataIdIndex, GetTheConcept, JUSTDATA, LocalSyncData, Logger, NORMAL, renderWidget, SchemaQueryListener } from "mftsccs-browser";
import { join } from "path";
import { Tracer } from "../../default/tracer";
import { group } from "console";

export function taskListTest(){

    let filter = new FilterSearch();
    filter.type = "id";
    filter.search = "101167453";
    filter.operateon = "issueEntity";
    filter.name = "myfilter";
    filter.logicoperator = "=";

    let issueEntity = new FreeschemaQuery();
    issueEntity.typeConnection = "the_issue_entity";
    issueEntity.name = "issueEntity";
    issueEntity.selectors = ["the_entity_name", "the_entity_email"];


    let issueData = new FreeschemaQuery();
    issueData.typeConnection = "the_task_s_issue";
    issueData.name = "issue";
    issueData.freeschemaQueries = [issueEntity];



    let freeschemaQuery = new FreeschemaQuery();
    freeschemaQuery.conceptIds = [101303622];
    freeschemaQuery.name = "top";
    freeschemaQuery.freeschemaQueries = [issueData];
    freeschemaQuery.filters = [filter];
    freeschemaQuery.outputFormat = DATAID;
    freeschemaQuery.filterLogic = "( myfilter )";

    SchemaQueryListener(freeschemaQuery, "").subscribe((output:any)=>{
        console.log("this is the output", output);
    })


}

export function listTask(){
  const userQuery = new FreeschemaQuery();
  userQuery.typeConnection = 'the_entity_user';
  userQuery.name = 'user';
  userQuery.selectors = ['self'];
  const entityQuery: FreeschemaQuery = new FreeschemaQuery();
  entityQuery.typeConnection = 'the_group_owner';
  entityQuery.name = 'entity';
  entityQuery.selectors = [
    'the_entity_firstname',
    'the_entity_lastname',
    'the_entity_avatar',
  ];
  entityQuery.freeschemaQueries = [userQuery];
  const groupQuery: FreeschemaQuery = new FreeschemaQuery();
  groupQuery.name = 'group';
  groupQuery.typeConnection = 'the_group_name';
  const freeschemQuery: FreeschemaQuery = new FreeschemaQuery();
  freeschemQuery.name = 'top';
  freeschemQuery.conceptIds = [101970106];
  freeschemQuery.outputFormat = DATAID;
  freeschemQuery.freeschemaQueries = [groupQuery, entityQuery];
  freeschemQuery.selectors = [
    'the_group_name',
    'the_group_description',
    'the_group_status',
    'the_group_image',
    'the_group_owner',
    'the_group_s_member',
    'the_group_s_invitees',
    'the_group_s_request',
    'the_group_s_contact_invitees',
  ];
  SchemaQueryListener(freeschemQuery, '').subscribe((data: any) => {
    console.log('data...', data);
  });

}




export function bijaySirTask(){

  const filters = new FilterSearch();
  filters.type = "the_firstname";
  filters.search = "Nischal";
  filters.operateon = 'groupsmember';
  filters.logicoperator = "=";
  filters.name = "myfilter";

  const nameConnection = new FreeschemaQuery();
  nameConnection.typeConnection = 'the_entity_firstname';
  nameConnection.name = 'groupsmember';
  nameConnection.selectors = [
    "the_entity_email"
  ];
  const query = new FreeschemaQuery();
  query.filters = [filters];
  query.filterLogic = "( myfilter )";
  query.name = 'top';
  query.outputFormat = JUSTDATA;
  query.type = "the_entity"
  query.inpage = 10;
  query.freeschemaQueries = [nameConnection];
  SchemaQueryListener(query, '').subscribe((data: any) => {
    console.log('data.....', data);
  })
}


export function mailFilter(inpage:number = 10, page:number = 1, doFilter:boolean = true){
  const subjectFilter = new FilterSearch()
    subjectFilter.name = 'subjectFilter'
    subjectFilter.type = 'the_subject';
    subjectFilter.logicoperator = 'like';
    subjectFilter.search = 'hi';
    subjectFilter.operateon = 'subject';

    const mailTextFilter = new FilterSearch()
    mailTextFilter.name = 'mailTextFilter'
    mailTextFilter.type = 'the_text';
    mailTextFilter.logicoperator = 'like';
    mailTextFilter.search = 'hi';
    mailTextFilter.operateon = 'mail_text';

    const flagQuery = new FreeschemaQuery();
    flagQuery.name = 'flag';
    flagQuery.typeConnection = 'the_mail_s_flag';

    const attachmentQuery = new FreeschemaQuery();
    attachmentQuery.name = 'attachment';
    attachmentQuery.typeConnection = 'the_mail_s_attachment';

    // const inReplytToQuery = new FreeschemaQuery();
    // inReplytToQuery.name = 'inReplyTo';
    // inReplytToQuery.typeConnection = 'the_mail_inreplyto';

    const subjectQuery = new FreeschemaQuery();
    subjectQuery.name = 'subject';
    subjectQuery.typeConnection = 'the_mail_subject';

    const mailTextQuery = new FreeschemaQuery();
    mailTextQuery.name = 'mail_text';
    mailTextQuery.typeConnection = 'the_mail_text';

    const toQuery = new FreeschemaQuery();
    toQuery.name = 'to';
    toQuery.typeConnection = 'the_mail_s_to';
    toQuery.selectors = ['the_to_address', 'the_to_name'];

    const fromQuery = new FreeschemaQuery();
    fromQuery.name = 'from';
    fromQuery.typeConnection = 'the_mail_s_from';
    fromQuery.selectors = ['the_from_address', 'the_from_name'];

    const mailQuery = new FreeschemaQuery();
    mailQuery.name = 'mail';
      mailQuery.typeConnection = `smtpDetail_s_sent`;
    mailQuery.freeschemaQueries = [subjectQuery, fromQuery, toQuery, attachmentQuery, flagQuery, mailTextQuery];
    mailQuery.selectors = [
      'the_mail_uid',
      'the_mail_messageid',
      'the_mail_receiveddate',
      'the_mail_date',
      'the_mail_headers',
      'the_mail_html',
      'the_mail_textashtml',
      'the_mail_inreplyto',
    ];
    mailQuery.includeInFilter = true
    mailQuery.page = page
    mailQuery.inpage = inpage
    mailQuery.limit = true
    mailQuery.order = "DESC";

    const smtpQuery = new FreeschemaQuery();
    smtpQuery.name = 'smtp';
    smtpQuery.conceptIds = [102873173];
    smtpQuery.freeschemaQueries = [mailQuery];
    smtpQuery.filters = [ subjectFilter, mailTextFilter ]
    if(doFilter){
      smtpQuery.filterLogic = "( subjectFilter OR mailTextFilter )"

    }
    smtpQuery.outputFormat = JUSTDATA;

    SchemaQueryListener(smtpQuery,"").subscribe((output:any)=>{
      console.log("this is the filter for the mail filter", output);
    })
}


export function santoshTask(){
  const issueFilter = new FilterSearch();
  issueFilter.name = 'issueFilter';
  issueFilter.type = 'the_type';
  issueFilter.search = 'bug';
  issueFilter.logicoperator = '=';
  issueFilter.operateon = 'selfdata';
  // issueFilter.composition = true;
  const issueCategoryFilter = new FilterSearch();
  issueCategoryFilter.name = 'issueCategoryFilter';
  issueCategoryFilter.type = 'id';
  issueCategoryFilter.search = '0';
  issueCategoryFilter.logicoperator = '>';
  issueCategoryFilter.operateon = 'issueCategory';
  const issueCommentFilter = new FilterSearch();
  issueCommentFilter.name = 'issueCommentFilter';
  issueCommentFilter.type = 'id';
  issueCommentFilter.search = '0';
  issueCommentFilter.logicoperator = '>';
  issueCommentFilter.operateon = 'issueResolution';
  const issueCategoryQuery = new FreeschemaQuery();
  issueCategoryQuery.name = 'issueCategory';
  issueCategoryQuery.typeConnection = 'the_issue_category';

  const selfQuery = new FreeschemaQuery();
  selfQuery.name = 'selfdata';
  selfQuery.typeConnection = 'self';
  // issueCategoryQuery.includeInFilter = true;
  const issueResolutionQuery = new FreeschemaQuery();
  issueResolutionQuery.name = 'issueResolution';
  issueResolutionQuery.typeConnection = 'issueComment_resolution';
  const issueCommentQuery = new FreeschemaQuery();
  issueCommentQuery.name = 'issueComment';
  issueCommentQuery.isOldConnectionType = true;
  issueCommentQuery.typeConnection = 'projectIssue_s_project_issue_comment_s';
  issueCommentQuery.selectors = ['self'];
  issueCommentQuery.freeschemaQueries = [issueResolutionQuery];
  const issueQuery = new FreeschemaQuery();
  issueQuery.name = 'issue';
  issueQuery.isOldConnectionType = true;
  issueQuery.typeConnection = 'boomFolder_s_project_issue_s';
  issueQuery.selectors = ['self'];
  issueQuery.freeschemaQueries = [issueCommentQuery, issueCategoryQuery,selfQuery];
  // issueQuery.includeInFilter = true;
  const query = new FreeschemaQuery();
  query.name = 'project';
  query.conceptIds = [101579679];
  query.freeschemaQueries = [issueQuery];
  query.outputFormat = JUSTDATA;
  query.filters = [issueCommentFilter, issueCategoryFilter, issueFilter];
  query.filterLogic =
    '( issueCommentFilter AND issueCategoryFilter OR issueFilter )';







  // query.includeInFilter = true;
  console.log('Sending query for project issue', query);
  // Your fetch logic here
  SchemaQueryListener(query, '').subscribe((value:any) => {
    console.log('Project data from FreeschemaQuery:', value);
    const issues = value?.[0]?.boomFolder?.boomFolder_s_project_issue_s || [];
    console.log('Project issues:', issues);
    // Call the table generation function
  });
}

export function royaltask(){
  const userQuery: FreeschemaQuery = new FreeschemaQuery();
      userQuery.typeConnection = 'the_entity_user_s';
      userQuery.name = 'user';
      userQuery.selectors = ['self'];
      const memberQuery: FreeschemaQuery = new FreeschemaQuery();
      memberQuery.typeConnection = 'the_group_s_member';
      memberQuery.name = 'memberquery';
      memberQuery.selectors = [
        'the_entity_firstname',
        'the_entity_lastname',
        'the_entity_avatar',
        'the_entity_user',
      ];
      memberQuery.freeschemaQueries = [userQuery];
      const nameConnection: FreeschemaQuery = new FreeschemaQuery();
      nameConnection.typeConnection = 'the_group_s_member';
      nameConnection.reverse = true;
      nameConnection.name = 'groupsmember';
      nameConnection.selectors = [
        'the_group_name',
        'the_group_description',
        'the_group_status',
        'the_group_image',
        'the_group_owner',
      ];
      nameConnection.freeschemaQueries = [memberQuery];
      const query: FreeschemaQuery = new FreeschemaQuery();
      query.name = 'top';
      query.conceptIds = [100802926];
      query.outputFormat = JUSTDATA;
      query.inpage = 10;
      query.freeschemaQueries = [nameConnection];
      SchemaQueryListener(query, '').subscribe((data: any) => {
        console.log('this is the groups...', data);
})

}


export  function getWidget(id:number, renderLatest:boolean = false){
   BuildWidgetFromId(id).then((output:any)=>{
    console.log("this is the widget", output);

  })
}

export function biprashTask2(){
  const month = '2025-01-31'
    
    const fromDateFilter = new FilterSearch();
    fromDateFilter.name = 'fromDateFilter';
    fromDateFilter.type = 'the_startTime';
    fromDateFilter.search = month;
    fromDateFilter.logicoperator = 'like';
    fromDateFilter.operateon = 'startTimer';

    const toDateFilter = new FilterSearch();
    toDateFilter.name = 'toDateFilter';
    toDateFilter.type = 'the_endTime';
    toDateFilter.search = month;
    toDateFilter.logicoperator = 'like';
    toDateFilter.operateon = 'endTimer';
    
    const timerStartQuery = new FreeschemaQuery();
    timerStartQuery.name = 'startTimer';
    timerStartQuery.selectors = ['self'];
    timerStartQuery.typeConnection = 'the_timer_starttime';

    const timerEndQuery = new FreeschemaQuery();
    timerEndQuery.name = 'endTimer';
    timerEndQuery.selectors = ['self'];
    timerEndQuery.typeConnection = 'the_timer_endtime';

    const timerUserQuery = new FreeschemaQuery();
    timerUserQuery.name = 'timer_user';
    timerUserQuery.selectors = ['self'];
    timerUserQuery.typeConnection = 'the_timer_user';

    const timerQuery = new FreeschemaQuery();
    timerQuery.name = 'timer';
    timerQuery.typeConnection = 'projectIssue_s_timer';
    timerQuery.selectors = [
      // 'the_timer_starttime',
      // 'the_timer_endtime',
      'the_timer_note',
      'the_timer_createdat',
      'the_timer_updatedat',
      'the_timer_user',
    ];
    timerQuery.freeschemaQueries = [timerUserQuery, timerStartQuery, timerEndQuery];

    const categoryQuery = new FreeschemaQuery();
    categoryQuery.name = 'category';
    categoryQuery.typeConnection = 'the_issue_category';

    const issueQuery = new FreeschemaQuery();
    issueQuery.name = 'issue';
    issueQuery.isOldConnectionType = true;
    issueQuery.selectors = ['self'];
    issueQuery.typeConnection = 'boomFolder_s_project_issue_s';
    issueQuery.freeschemaQueries = [timerQuery, categoryQuery];

    const boardQuery = new FreeschemaQuery();
    boardQuery.name = 'board';
    boardQuery.isOldConnectionType = true;
    boardQuery.selectors = ['self'];
    boardQuery.typeConnection = 'boomFolder_s_project_board_s';

    const projectQuery = new FreeschemaQuery()
    projectQuery.name = "project"
    projectQuery.isOldConnectionType = true
    projectQuery.typeConnection = "the_user_s_joined_project_s"
    projectQuery.selectors = ['self']
    projectQuery.freeschemaQueries = [issueQuery, boardQuery]

    const userQuery = new FreeschemaQuery()
    userQuery.name = "user"
    userQuery.isOldConnectionType = true
    userQuery.typeConnection = "the_user_s_has_humanizing_data_role_s"
    userQuery.selectors = ['self']
    userQuery.reverse = true
    userQuery.freeschemaQueries = [projectQuery]

    const query = new FreeschemaQuery()
    query.name = "role"
    // query.conceptIds = [companyConcept.id]
    query.conceptIds = [101090119]
    query.freeschemaQueries = [userQuery]
    query.outputFormat = JUSTDATA
    query.filters = [fromDateFilter, toDateFilter]
    query.filterLogic = "( fromDateFilter OR toDateFilter )"

SchemaQueryListener(query, "").subscribe((value: any) => {
      console.log('temp', value)
})
}

export function nischalTask(){
  let freeschemaQuery = new FreeschemaQuery();
  freeschemaQuery.name = "top";
  freeschemaQuery.type = "the_item";
  freeschemaQuery.selectors = [
    "the_item_name",
  ]
  SchemaQueryListener(freeschemaQuery,"").subscribe((output:any)=>{
    console.log("this is the output", output);
  })
}

export function biprashTask(){
  let conceptIds = [100566925,100641580,100507897,100510005,100573905,101440384,100541245,101139065,100932823,100581545,100943262,100617165,100737777,100888621,100507902,100532405,100703731,100659821,100749027,100510405,100735734,100510985,100507896,101139856,100537745,100507898,101082256,100538750,100507900,100542555,101275081,100571025,100556225,100618825,100730261,100624506,100507901,101118797,100591566,101156043,101387581,100825767,100581746,100618885,100991488,100991489,101162956,101159338,100625988,101151965,101323683,101138177,101103941,100685987,100587565,100827847,100597105,101103947,100618985,101157985,101392274,101116247,100611125,101392932,101392933,100949988,101148379,100716047,100941734,100627200,100829565,101392946,101130622,100566901,101153867,101153869,100988330,100988331,100584385,100842339,101387659,101387678,100825434,100842340,100983372,101068113,100989322,100829567,100903513,101387661,100577945,100983370,100659812,100924850,101157987,101157989,101387667,101103942,101103944,100991735,100991737,101104727,100855226,100855228,101158091,101387674,101387677,101387668,101387670,101387672,101387675,100988334,101104550,101387679,101387681,100989110,100989114,101387663,101387665,101387666,101351636,101387673,100606445,100737460,100987573,100581405,100567045,101152362,100993503,101364775,101117671,100737805,101152165,100510045,100950029,100991490,100586725,100983374,101323685,100537719,101159340,100605865,100832375,100993494,100620125,100855230,100624401,100542565,100888624,101104720,101097673,100825431,100888806,100538765,101064523,100992106,100888807,100538767,100983377,100595066,100609805,100993498,100993499,101139861,100581365,101361950,101115327,100507903,100507899,101365680,100507904,100507894];

  let connectionIds = [4952376,4952377,4576176,4576177,4576141,4576135,4576136,4576130,4573394,4573395,4550230,4550231,4550224,4550225,4550112,4550113,4550118,4550119,4550040,4550041,4550046,4550047,4550052,4550053,4550058,4550059,4550064,4550065,4550070,4550071,4550076,4550077,4550082,4550083,4550088,4550089,4550094,4550095,4550100,4550101,4550106,4550107,4549943,4549944,4428699,4428700,4424566,4424567,4411294,4411295,4347034,4347035,4177755,4177756,4177748,4177749,3753223,3753224,3167094,3167095,3055472,3055473,3055466,3055467,3019369,3019370,3019367,3018765,3010398,3010399,3010392,3010393,2953483,2953484,2893147,2893148,2891541,2891542,2873028,2873029,2872285,2872286,2868500,2868501,2800368,2800369,2776102,2776103,2776028,2776029,2775162,2775163,2773848,2773849,2765392,2765393,2747698,2747699,2746432,2746433,2745102,2745103,2744074,2744075,2731646,2731647,2731463,2731464,2731213,2731214,2730690,2730691,2730684,2730685,2730678,2730679,2730672,2730673,2717569,2717570,2693183,2693184,2683597,2683598,2677428,2677429,2608242,2608243,2608184,2608185,2608178,2608179,2608108,2608109,2606793,2606794,2606461,2606462,2606455,2606456,2606145,2606146,2606139,2606140,2606133,2606134,2602358,2602359,2602351,2602352,2602353,2602344,2602345,2602346,2602348,2602350,2602320,2602328,2602335,2602347,2602349,2602272,2602273,2602266,2602268,2602192,2602193,2601907,2601908,2601910,2601912,2601914,2601919,2601921,2601923,2601924,2601926,2601928,2601952,2601954,2601955,2601956,2601958,2601960,2601961,2601962,2601963,2601964,2601965,2601894,2601895,2601888,2601889,2601882,2601883,2599727,2599728,2595605,2595606,2595539,2595540,2595413,2595414,2595392,2595393,2560784,2560785,2560728,2560729,2555044,2555045,2551024,2551025,2532441,2532442,2521766,2521767,2501974,2501975,2479607,2479608,2479601,2479602,2479595,2479596,2479589,2479590,2455665,2455666,2455463,2455464,2455457,2455458,2432938,2432939,2432932,2432933,2427843,2427844,2422673,2422674,2422667,2422668,2420258,2420259,2417838,2417839,2417384,2417385,2257248,2257249,2253977,2253978,2234215,2234218,2234194,2234197,2233995,2233998,2232202,2232205,2226822,2226825,2220842,2220843,2220835,2220836,2220837,2220838,2220839,2220840,2220841,2220834,1529902,1529905,1506316,1506319,1482377,1482380,1425406,1425409,1425357,1425360,1377069,1377070,1306237,1306238,1301399,1301400,1301144,1301145,1295335,1295336,1293725,1293726,1293646,1293647,1293606,1293607,1290412,1290413,1283244,1283245,1280714,1280715,1272448,1272449,1271573,1271574,1252878,1252879,1247701,1247702,1240326,1240327,1233029,1233030,1229866,1229867,1221472,1221473,1217004,1217005,1216877,1216878,1216305,1216306,1216280,1216281,1207833,1207834,1200269,1200270,1193615,1193616,1185047,1185048,1184890,1184892,1184884,1184885,1170285,1170286,1149643,1149644,1149629,1149630,1145586,1145587,1098694,1098695,1098688,1098689,1098685,1098686,1098687,1097114,1097115,1097096,1097097,1086580,1086581,1053918,1053919,1052746,1052747,1052295,1052296,1048856,1048859,1048861,1048863,1048857,1048851,1048686,1048690,1048693,1048707,1048712,1048716,1048731,1048737,1048741,1048757,1048763,1048770,1048785,1048792,1048798,1048681,1048684,1048689,1048696,1048698,1048704,1048721,1048722,1048728,1048744,1048748,1048756,1048772,1048779,1048782,1048801,1048804,1048807,1048692,1048694,1048697,1048706,1048713,1048714,1048730,1048736,1048740,1048762,1048765,1048768,1048789,1048794,1048797,1048810,1048813,1048815,1048677,1048685,1048699,1048705,1048711,1048719,1048723,1048729,1048742,1048746,1048754,1048773,1048780,1048783,1048800,1048803,1048806,1048818,1048821,1048824,1048715,1048720,1048735,1048739,1048743,1048758,1048764,1048769,1048791,1048796,1048799,1048809,1048812,1048816,1048827,1048829,1048831,1048745,1048753,1048759,1048771,1048774,1048781,1048802,1048805,1048808,1048819,1048822,1048825,1048833,1048835,1048837,1048784,1048790,1048795,1048811,1048814,1048817,1048828,1048830,1048832,1048839,1048841,1048843,1048820,1048823,1048826,1048834,1048836,1048838,1048845,1048846,1048847,1048840,1048842,1048844,1048848,1048849,1048850,1048613,1048621,1048622,1048625,1048633,1048637,1048639,1048648,1048652,1048655,1048666,1048672,1048675,1048627,1048632,1048641,1048644,1048647,1048658,1048660,1048665,1048651,1048654,1048657,1048667,1048671,1048674];
 GetCompositionFromConnectionsWithDataIdIndex(conceptIds, connectionIds).then((output:any)=>{
  console.log("these are the compositions", output);
 })
}


  export async function santoshSirTask(searchTerm:string = "mero"){
    let userConceptId: number = 100607749;
    let compBoomFolder: string = "boomFolder";
    let linkerMyConsole: string = "my_console";
    let pageSize = 10;
    let currentPage = 1;


    const userTimerFilter = new FilterSearch();
    userTimerFilter.name = 'userTimerFilter';
    userTimerFilter.type = 'id';
    userTimerFilter.search = userConceptId.toString();
    userTimerFilter.logicoperator = '=';
    userTimerFilter.operateon = 'timer_user';


    const toTimerFilter = new FilterSearch();
    toTimerFilter.name = 'toTimerFilter';
    toTimerFilter.type = 'entry_timestamp';
    toTimerFilter.search = "02/07/2025";
    toTimerFilter.logicoperator = '<';
    toTimerFilter.operateon = 'timer';


    const fromTimerFilter = new FilterSearch();
    fromTimerFilter.name = 'fromTimerFilter';
    fromTimerFilter.type = 'entry_timestamp';
    fromTimerFilter.search = "01/31/2025"
    fromTimerFilter.logicoperator = '>';
    fromTimerFilter.operateon = 'timer';


    const timerUserQuery = new FreeschemaQuery();
    timerUserQuery.name = 'timer_user';
    // timerUserQuery.selectors = ['self'];
    timerUserQuery.typeConnection = 'the_timer_user';
    // const timerUpdatedAtQuery = new FreeschemaQuery();
    // timerUpdatedAtQuery.name = 'timerUpdatedAtQuery';
    // // timerUserQuery.selectors = ['self'];
    // timerUpdatedAtQuery.typeConnection = 'the_timer_updatedat';
    const timerQuery = new FreeschemaQuery();
    timerQuery.name = 'timer';
    timerQuery.typeConnection = 'projectIssue_s_timer';
    timerQuery.selectors = [
      // 'the_timer_starttime',
      // 'the_timer_endtime',
      // 'the_timer_note',
      // 'the_timer_createdat',
      'the_timer_updatedat',
      // 'the_timer_user',
    ];
    timerQuery.freeschemaQueries = [timerUserQuery];
    // timerQuery.freeschemaQueries = [timerUserQuery, timerUpdatedAtQuery];


    const issueQuery = new FreeschemaQuery();
    issueQuery.name = 'issue';
    issueQuery.isOldConnectionType = true;
    issueQuery.typeConnection = 'boomFolder_s_project_issue_s';
    issueQuery.freeschemaQueries = [timerQuery];


    const projectQuery = new FreeschemaQuery();
    projectQuery.name = 'usersproject';
    projectQuery.isOldConnectionType = true;
    projectQuery.typeConnection = 'the_user_s_joined_project_s';
    projectQuery.selectors = ['self'];
    projectQuery.freeschemaQueries = [issueQuery];


    const query = new FreeschemaQuery();
    query.name = 'top';
    query.conceptIds = [userConceptId];
    query.freeschemaQueries = [projectQuery];
    query.outputFormat = JUSTDATA;
    // query.filters = [userTimerFilter];
    // query.filterLogic = '( userTimerFilter )';
    query.filters = [userTimerFilter, fromTimerFilter, toTimerFilter];
    query.filterLogic =
      '( fromTimerFilter EXAND toTimerFilter )';
    // console.log('this is the folder');
    SchemaQueryListener(query, '').subscribe(async (data: any) => {
      console.log('this is the data for last worked projects', data);
    });
    // console.log('this is the folder');









  }

export function withoutfilter(){
  let page = 1;
  let inpage = 10;
  let userConcept =100579148; 
  let entityId = 100711905;
        // freeschema query for maps contacts
        const mapQuery: FreeschemaQuery = new FreeschemaQuery();
        mapQuery.typeConnection = 'the_entity_s_maps_contact_s';
        mapQuery.isOldConnectionType = true;
        mapQuery.name = 'mapname';
        mapQuery.selectors = ['self'];
        // freeschema query for linkedin contacts
        const linkedinQuery: FreeschemaQuery = new FreeschemaQuery();
        linkedinQuery.typeConnection = 'the_entity_s_linkedin_contact_s';
        linkedinQuery.isOldConnectionType = true;
        linkedinQuery.name = 'linkedinname';
        linkedinQuery.selectors = ['self'];
        // freeschema query for whatsapp contacts
        const whatsappQuery: FreeschemaQuery = new FreeschemaQuery();
        whatsappQuery.typeConnection = 'the_entity_s_whatsapp_contact_s';
        whatsappQuery.isOldConnectionType = true;
        whatsappQuery.name = 'whatsappname';
        whatsappQuery.selectors = ['self'];
        // freeschema query for indeed contacts
        const indeedQuery: FreeschemaQuery = new FreeschemaQuery();
        indeedQuery.typeConnection = 'the_entity_s_indeed_contact_s';
        indeedQuery.isOldConnectionType = true;
        indeedQuery.name = 'indeedname';
        indeedQuery.selectors = ['self'];
        // freeschema query for monster contacts
        const monsterQuery: FreeschemaQuery = new FreeschemaQuery();
        monsterQuery.typeConnection = 'the_entity_s_monster_contact_s';
        monsterQuery.isOldConnectionType = true;
        monsterQuery.name = 'monstername';
        monsterQuery.selectors = ['self'];
        // freeschema query for crm added contacts
        const crmQuery: FreeschemaQuery = new FreeschemaQuery();
        crmQuery.typeConnection = 'the_entity_s_crm_contact_s';
        crmQuery.isOldConnectionType = true;
        crmQuery.name = 'crmname';
        crmQuery.selectors = ['self'];
        // first query to go from user contacts
        const firstQuery: FreeschemaQuery = new FreeschemaQuery();
        firstQuery.typeConnection = 'the_user_s_contact_s';
        firstQuery.inpage = inpage;
        firstQuery.page = page;
        firstQuery.limit = true;
        firstQuery.isOldConnectionType = true;
        firstQuery.name = 'contactname';
        firstQuery.selectors = ['the_entity_name'];
        firstQuery.freeschemaQueries = [
          mapQuery,
          linkedinQuery,
          whatsappQuery,
          indeedQuery,
          monsterQuery,
          crmQuery,
        ];
        // address connection
        const addressConnection: FreeschemaQuery = new FreeschemaQuery();
        addressConnection.typeConnection = 'the_address_country';
        addressConnection.name = 'itemaddress';
        const addressQuery: FreeschemaQuery = new FreeschemaQuery();
        addressQuery.typeConnection = 'the_entity_s_address';
        addressQuery.freeschemaQueries = [addressConnection];
        addressQuery.name = 'addressname';
        addressQuery.selectors = [
          'the_address_address',
          'the_address_type',
          'the_address_postalcode',
          'the_address_city',
          'the_address_country',
          'the_address_street',
        ];
        // phone connection
        const phoneConnection: FreeschemaQuery = new FreeschemaQuery();
        phoneConnection.typeConnection = 'the_phone_phone';
        phoneConnection.name = 'itemphone';
        const phoneQuery: FreeschemaQuery = new FreeschemaQuery();
        phoneQuery.typeConnection = 'the_entity_s_phone';
        phoneQuery.freeschemaQueries = [phoneConnection];
        phoneQuery.name = 'phonename';
        phoneQuery.selectors = [
          'the_phone_phone',
          'the_phone_countryCode',
          'the_phone_type',
        ];
        // qmail query
        const emailConnection: FreeschemaQuery = new FreeschemaQuery();
        emailConnection.typeConnection = 'the_email_email';
        emailConnection.name = 'itememail';
        const emailQuery: FreeschemaQuery = new FreeschemaQuery();
        emailQuery.typeConnection = 'the_entity_s_email';
        emailQuery.freeschemaQueries = [emailConnection];
        emailQuery.name = 'emailname';
        emailQuery.selectors = ['the_email_email'];
        // first level query for entity contacts
        const entityQuery = new FreeschemaQuery();
        entityQuery.typeConnection = 'the_entity_s_crm_contact_s';
        entityQuery.limit = true;
        entityQuery.page = page;
        entityQuery.inpage = inpage;
        entityQuery.isOldConnectionType = false;
        entityQuery.freeschemaQueries = [addressQuery, phoneQuery, emailQuery];
        entityQuery.name = 'entitycontacts';
        entityQuery.selectors = [
          'the_entity_avatar',
          'the_entity_name',
          'the_entity_source_url',
          'the_entity_last_name',
          'the_entity_middle_name',
          'the_entity_first_name',
          'the_entity_company_name',
          'the_entity_department_name',
          'the_entity_website',
          'the_entity_tag',
          'the_entity_data_type',
          'the_entity_type',
          'the_entity_googleLocation',
          'the_entity_companySize',
          'the_entity_ceo',
          'the_entity_revenue',
          'the_entity_founded',
          'the_entity_created_at',
          'the_entity_email',
          'the_entity_title',
          'the_entity_gender',
          'the_entity_phone',
          'the_entity_firstname',
          'the_entity_lastname',
          'the_entity_s_email',
          'the_entity_s_phone',
          'the_entity_s_address',
        ];
        // first level query for entity contacts
        const contactTableQuery = new FreeschemaQuery();
        contactTableQuery.typeConnection = 'the_entity_contact_table';
        contactTableQuery.isOldConnectionType = false;
        contactTableQuery.name = 'contacttable';
        contactTableQuery.selectors = [
          'the_table_contact_name',
          'the_table_phone_number',
          'the_table_address',
          'the_table_website',
          'the_table_location_url',
          'the_table_company_size',
          'the_table_company_owner',
          'the_table_company_revenue',
          'the_table_founded_date',
          'the_table_label',
          'the_table_relation',
          'the_table_email',
        ];
        // top level query for freeschema query
        const freeschemaQuery: FreeschemaQuery = new FreeschemaQuery();
        freeschemaQuery.conceptIds = [Number(userConcept), Number(entityId)];
        freeschemaQuery.name = 'top';
        freeschemaQuery.freeschemaQueries = [
          firstQuery,
          entityQuery,
          contactTableQuery,
        ];
        freeschemaQuery.outputFormat = JUSTDATA;
        freeschemaQuery.order = 'DESC';
        // Execute the query and get data
        SchemaQueryListener(freeschemaQuery, "").subscribe((output:any)=>{
          console.log("this is the output for the without filter", output);
        })
}

export function BuildWidget(){
  let body = document.getElementById("widget2");
  if(body){
    renderWidget(101680065,body).then((output:any)=>{
      console.log("this is the widget build", output);
    })
  }


}

// export function filteredData(){
//     const nameConnection: FreeschemaQuery = new FreeschemaQuery();
//       nameConnection.typeConnection = 'the_entity_name';
//       nameConnection.name = 'itemname';
//       const nameFilter: FilterSearch = new FilterSearch();
//       nameFilter.type = 'the_name';
//       nameFilter.search = searchText;
//       nameFilter.logicoperator = 'like';
//       nameFilter.name = 'namefilters';
//       nameFilter.operateon = 'itemname';
//       // name connection
//       const companyNameConnection: FreeschemaQuery = new FreeschemaQuery();
//       companyNameConnection.typeConnection = 'the_entity_company_name';
//       companyNameConnection.name = 'itemcompanyname';
//       const companyNameFilter: FilterSearch = new FilterSearch();
//       companyNameFilter.type = 'the_company_name';
//       companyNameFilter.search = searchText;
//       companyNameFilter.logicoperator = 'like';
//       companyNameFilter.name = 'companyNameFilters';
//       companyNameFilter.operateon = 'itemcompanyname';
//       // name connection
//       const departmentNameConnection: FreeschemaQuery = new FreeschemaQuery();
//       departmentNameConnection.typeConnection = 'the_entity_department_name';
//       departmentNameConnection.name = 'itemdepartmentname';
//       const departmentNameFilter: FilterSearch = new FilterSearch();
//       departmentNameFilter.type = 'the_department_name';
//       departmentNameFilter.search = searchText;
//       departmentNameFilter.logicoperator = 'like';
//       departmentNameFilter.name = 'departmentNameFilters';
//       departmentNameFilter.operateon = 'itemdepartmentname';
//       // email connection
//       const emailConnection: FreeschemaQuery = new FreeschemaQuery();
//       emailConnection.typeConnection = 'the_email_email';
//       emailConnection.name = 'itememail';
//       const emailFilter: FilterSearch = new FilterSearch();
//       emailFilter.type = 'the_email';
//       emailFilter.search = searchText;
//       emailFilter.logicoperator = 'like';
//       emailFilter.name = 'emailsFilter';
//       emailFilter.operateon = 'itememail';
//       const emailQuery: FreeschemaQuery = new FreeschemaQuery();
//       emailQuery.typeConnection = 'the_entity_s_email';
//       emailQuery.freeschemaQueries = [emailConnection];
//       emailQuery.name = 'emailname';
//       emailQuery.selectors = ['the_email_email'];
//       // address connection
//       const addressConnection: FreeschemaQuery = new FreeschemaQuery();
//       addressConnection.typeConnection = 'the_address_country';
//       addressConnection.name = 'itemaddress';
//       const addressFilter: FilterSearch = new FilterSearch();
//       addressFilter.type = 'the_street';
//       addressFilter.logicoperator = 'like';
//       addressFilter.name = 'addressFilter';
//       addressFilter.operateon = 'itemaddress';
//       const addressQuery: FreeschemaQuery = new FreeschemaQuery();
//       addressQuery.typeConnection = 'the_entity_s_address';
//       addressQuery.freeschemaQueries = [addressConnection];
//       addressQuery.name = 'addressname';
//       addressQuery.selectors = [
//         'the_address_address',
//         'the_address_type',
//         'the_address_postalcode',
//         'the_address_city',
//         'the_address_country',
//       ];
//       // phone connection
//       const phoneConnection: FreeschemaQuery = new FreeschemaQuery();
//       phoneConnection.typeConnection = 'the_phone_phone';
//       phoneConnection.name = 'itemphone';
//       const phoneFilter: FilterSearch = new FilterSearch();
//       phoneFilter.type = 'the_phone';
//       phoneFilter.logicoperator = 'like';
//       phoneFilter.name = 'phoneFilter';
//       phoneFilter.operateon = 'itemphone';
//       const phoneQuery: FreeschemaQuery = new FreeschemaQuery();
//       phoneQuery.typeConnection = 'the_entity_s_phone';
//       phoneQuery.freeschemaQueries = [phoneConnection];
//       phoneQuery.name = 'phonename';
//       phoneQuery.selectors = [
//         'the_phone_phone',
//         'the_phone_countryCode',
//         'the_phone_type',
//       ];
//       const contactConnection: FreeschemaQuery = new FreeschemaQuery();
//       contactConnection.typeConnection = 'the_entity_s_crm_contact_s';
//       contactConnection.freeschemaQueries = [
//         nameConnection,
//         companyNameConnection,
//         departmentNameConnection,
//         emailQuery,
//         addressQuery,
//         phoneQuery,
//       ];
//       contactConnection.selectors = [
//         'the_entity_title',
//         'the_entity_avatar',
//         'the_entity_website',
//         'the_entity_tag',
//         'the_entity_type',
//         'the_entity_s_email',
//         'the_entity_s_address',
//       ];
//       contactConnection.includeInFilter = true;
//       const freeschemaQuery: FreeschemaQuery = new FreeschemaQuery();
//       freeschemaQuery.conceptIds = [this.entityId];
//       freeschemaQuery.filterLogic =
//         '( namefilters OR emailsFilter OR companyNameFilters OR departmentNameFilters )';
//       freeschemaQuery.filters = [
//         nameFilter,
//         emailFilter,
//         companyNameFilter,
//         departmentNameFilter,
//       ];
//       freeschemaQuery.name = 'top';
//       freeschemaQuery.freeschemaQueries = [contactConnection];
//       freeschemaQuery.outputFormat = JUSTDATA;
//       freeschemaQuery.inpage = 100;
// }