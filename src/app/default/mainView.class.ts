export default class {
    params: any;
  
    constructor(params: any) {
      this.params = params;
    }
  
    setTitle(title: string): void {
      document.title = title;
    }
  
    async getHtml(): Promise<string> {    
      return '';
    }
  }