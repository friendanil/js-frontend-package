import { DATAID, FilterSearch, FreeschemaQuery, JUSTDATA, SchemaQueryListener } from "mftsccs-browser";

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

export function royaltask(){
    let page = 1;
    let inpage = 10;
    // get the user conceptID
    const userConcept = 100633041;
    const entityId = 100802926;
    let searchText = "Valentine";

    const linkedinfilter = new FilterSearch();
    linkedinfilter.type = 'the_name';
    linkedinfilter.search = searchText;
    linkedinfilter.logicoperator = 'like';
    linkedinfilter.name = 'linkedinselffilter';
    linkedinfilter.operateon = 'linkedinself';
    const linkedinSelf = new FreeschemaQuery();
    linkedinSelf.typeConnection = 'self';
    linkedinSelf.name = 'linkedinself';
    const linkedinQuery: FreeschemaQuery = new FreeschemaQuery();
    linkedinQuery.typeConnection = 'the_entity_s_linkedin_contact_s';
    linkedinQuery.isOldConnectionType = true;
    linkedinQuery.name = 'linkedinname';
    linkedinQuery.includeInFilter = true;
    linkedinQuery.freeschemaQueries = [linkedinSelf];
    // maps filter
    const mapsFilter = new FilterSearch();
    mapsFilter.type = 'the_name';
    mapsFilter.search = searchText;
    mapsFilter.logicoperator = 'like';
    mapsFilter.name = 'mapselffilter';
    mapsFilter.operateon = 'mapself';
    const mapSelf = new FreeschemaQuery();
    mapSelf.typeConnection = 'self';
    mapSelf.name = 'mapself';
    const mapsQuery: FreeschemaQuery = new FreeschemaQuery();
    mapsQuery.typeConnection = 'the_entity_s_maps_contact_s';
    mapsQuery.isOldConnectionType = true;
    mapsQuery.name = 'mapname';
    mapsQuery.includeInFilter = true;
    mapsQuery.freeschemaQueries = [mapSelf];
    // indeeed filter
    const indeedFilter = new FilterSearch();
    indeedFilter.type = 'the_name';
    indeedFilter.search = searchText;
    indeedFilter.logicoperator = 'like';
    indeedFilter.name = 'indeedselffilter';
    indeedFilter.operateon = 'indeedself';
    const indeedSelf = new FreeschemaQuery();
    indeedSelf.typeConnection = 'self';
    indeedSelf.name = 'indeedself';
    const indeedQuery: FreeschemaQuery = new FreeschemaQuery();
    indeedQuery.typeConnection = 'the_entity_s_indeed_contact_s';
    indeedQuery.isOldConnectionType = true;
    indeedQuery.name = 'indeedname';
    indeedQuery.includeInFilter = true;
    indeedQuery.freeschemaQueries = [indeedSelf];
    // monster filter
    const monsterFilter = new FilterSearch();
    monsterFilter.type = 'the_name';
    monsterFilter.search = searchText;
    monsterFilter.logicoperator = 'like';
    monsterFilter.name = 'monsterselffilter';
    monsterFilter.operateon = 'monsterself';
    const monsterSelf = new FreeschemaQuery();
    monsterSelf.typeConnection = 'self';
    monsterSelf.name = 'monsterself';
    const monsterQuery: FreeschemaQuery = new FreeschemaQuery();
    monsterQuery.typeConnection = 'the_entity_s_monster_contact_s';
    monsterQuery.isOldConnectionType = true;
    monsterQuery.name = 'monstername';
    monsterQuery.includeInFilter = true;
    monsterQuery.freeschemaQueries = [monsterSelf];
    // whatsapp filter
    const whatsappFilter = new FilterSearch();
    whatsappFilter.type = 'the_name';
    whatsappFilter.search = searchText;
    whatsappFilter.logicoperator = 'like';
    whatsappFilter.name = 'whatsappselffilter';
    whatsappFilter.operateon = 'whatsappself';
    const whatsappSelf = new FreeschemaQuery();
    whatsappSelf.typeConnection = 'self';
    whatsappSelf.name = 'whatsappself';
    const whatsappQuery: FreeschemaQuery = new FreeschemaQuery();
    whatsappQuery.typeConnection = 'the_entity_s_whatsapp_contact_s';
    whatsappQuery.isOldConnectionType = true;
    whatsappQuery.name = 'whatsappname';
    whatsappQuery.includeInFilter = true;
    whatsappQuery.freeschemaQueries = [whatsappSelf];
    // crm filter
    const crmFilter = new FilterSearch();
    crmFilter.type = 'the_name';
    crmFilter.search = searchText;
    crmFilter.logicoperator = 'like';
    crmFilter.name = 'crmselffilter';
    crmFilter.operateon = 'crmself';
    const crmSelf = new FreeschemaQuery();
    crmSelf.typeConnection = 'self';
    crmSelf.name = 'whatsappself';
    const crmQuery: FreeschemaQuery = new FreeschemaQuery();
    crmQuery.typeConnection = 'the_entity_s_crm_contact_s';
    crmQuery.isOldConnectionType = true;
    crmQuery.name = 'crmname';
    crmQuery.includeInFilter = true;
    crmQuery.freeschemaQueries = [crmSelf];
    const firstQuery: FreeschemaQuery = new FreeschemaQuery();
    firstQuery.typeConnection = 'the_user_s_contact_s';
    firstQuery.inpage = 10;
    firstQuery.page = 1;
    firstQuery.limit = true;
    firstQuery.isOldConnectionType = true;
    firstQuery.name = 'contactname';
    firstQuery.selectors = ['the_entity_name'];
    firstQuery.freeschemaQueries = [
      linkedinQuery,
      mapsQuery,
      indeedQuery,
      monsterQuery,
      whatsappQuery,
      crmQuery,
    ];
    // name connection
    const nameConnection: FreeschemaQuery = new FreeschemaQuery();
    nameConnection.typeConnection = 'the_entity_name';
    nameConnection.name = 'itemname';
    const nameFilter: FilterSearch = new FilterSearch();
    nameFilter.type = 'the_name';
    nameFilter.search = searchText;
    nameFilter.logicoperator = 'like';
    nameFilter.name = 'namefilters';
    nameFilter.operateon = 'itemname';
    // name connection
    const companyNameConnection: FreeschemaQuery = new FreeschemaQuery();
    companyNameConnection.typeConnection = 'the_entity_company_name';
    companyNameConnection.name = 'itemcompanyname';
    const companyNameFilter: FilterSearch = new FilterSearch();
    companyNameFilter.type = 'the_company_name';
    companyNameFilter.search = searchText;
    companyNameFilter.logicoperator = 'like';
    companyNameFilter.name = 'companyNameFilters';
    companyNameFilter.operateon = 'itemcompanyname';
    // name connection
    const departmentNameConnection: FreeschemaQuery = new FreeschemaQuery();
    departmentNameConnection.typeConnection = 'the_entity_department_name';
    departmentNameConnection.name = 'itemdepartmentname';
    const departmentNameFilter: FilterSearch = new FilterSearch();
    departmentNameFilter.type = 'the_department_name';
    departmentNameFilter.search = searchText;
    departmentNameFilter.logicoperator = 'like';
    departmentNameFilter.name = 'departmentNameFilters';
    departmentNameFilter.operateon = 'itemdepartmentname';
    // email connection
    const emailConnection: FreeschemaQuery = new FreeschemaQuery();
    emailConnection.typeConnection = 'the_email_email';
    emailConnection.name = 'itememail';
    const emailFilter: FilterSearch = new FilterSearch();
    emailFilter.type = 'the_email';
    emailFilter.search = searchText;
    emailFilter.logicoperator = 'like';
    emailFilter.name = 'emailsFilter';
    emailFilter.operateon = 'itememail';
    const emailQuery: FreeschemaQuery = new FreeschemaQuery();
    emailQuery.typeConnection = 'the_entity_s_email';
    emailQuery.freeschemaQueries = [emailConnection];
    emailQuery.name = 'emailname';
    emailQuery.selectors = ['the_email_email'];
    // address connection
    const addressConnection: FreeschemaQuery = new FreeschemaQuery();
    addressConnection.typeConnection = 'the_address_country';
    addressConnection.name = 'itemaddress';
    const addressFilter: FilterSearch = new FilterSearch();
    addressFilter.type = 'the_street';
    addressFilter.logicoperator = 'like';
    addressFilter.name = 'addressFilter';
    addressFilter.operateon = 'itemaddress';
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
    ];
    // phone connection
    const phoneConnection: FreeschemaQuery = new FreeschemaQuery();
    phoneConnection.typeConnection = 'the_phone_phone';
    phoneConnection.name = 'itemphone';
    const phoneFilter: FilterSearch = new FilterSearch();
    phoneFilter.type = 'the_phone';
    phoneFilter.logicoperator = 'like';
    phoneFilter.name = 'phoneFilter';
    phoneFilter.operateon = 'itemphone';
    const phoneQuery: FreeschemaQuery = new FreeschemaQuery();
    phoneQuery.typeConnection = 'the_entity_s_phone';
    phoneQuery.freeschemaQueries = [phoneConnection];
    phoneQuery.name = 'phonename';
    phoneQuery.selectors = [
      'the_phone_phone',
      'the_phone_countryCode',
      'the_phone_type',
    ];
    const contactConnection: FreeschemaQuery = new FreeschemaQuery();
    contactConnection.typeConnection = 'the_entity_s_crm_contact_s';
    contactConnection.freeschemaQueries = [
      nameConnection,
      companyNameConnection,
      departmentNameConnection,
      emailQuery,
      addressQuery,
      phoneQuery,
    ];
    contactConnection.selectors = [
      'the_entity_title',
      'the_entity_avatar',
      'the_entity_website',
      'the_entity_tag',
      'the_entity_type',
      'the_entity_s_email',
      'the_entity_s_address',
    ];
    contactConnection.includeInFilter = true;
    contactConnection.name = 'entitycontacts';
    const freeschemaQuery: FreeschemaQuery = new FreeschemaQuery();
    freeschemaQuery.conceptIds = [
      userConcept,
      entityId,
    ];
    freeschemaQuery.filterLogic =
      '( namefilters OR emailsFilter OR companyNameFilters OR departmentNameFilters OR linkedinselffilter OR mapselffilter OR indeedselffilter OR monsterselffilter OR whatsappselffilter OR crmselffilter )';
    freeschemaQuery.filters = [
      nameFilter,
      emailFilter,
      companyNameFilter,
      departmentNameFilter,
      linkedinfilter,
      mapsFilter,
      indeedFilter,
      monsterFilter,
      whatsappFilter,
      crmFilter,
    ];
    freeschemaQuery.name = 'top';
    freeschemaQuery.freeschemaQueries = [firstQuery, contactConnection];
    freeschemaQuery.outputFormat = JUSTDATA;
    freeschemaQuery.inpage = 100;
    SchemaQueryListener(freeschemaQuery, '').subscribe((output:any)=>{
      console.log("this is the output", output);
    })

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