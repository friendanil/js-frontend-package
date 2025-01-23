export default class {
    params: any;
  
    constructor(params: any) {
      this.params = params;
    }

    async mount(parent:any){
      //parent.innerHTML = "";
      const htmlContentDetails =  await this?.getHtml();
      parent.innerHTML = htmlContentDetails;
    }
  
    setTitle(title: string): void {
      document.title = title;
    }
  
    async getHtml(): Promise<string> {    
      return '';
    }
  }