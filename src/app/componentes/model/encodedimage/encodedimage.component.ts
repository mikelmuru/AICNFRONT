export class EncodedImage {
  public imageid: number = 0;
  public imagebytes: string = '';
  public imagename: string = '';
  public imageresult: string = '';
  
//AUDIT VARIALBES
  public createddate: Date = new Date();
  public createdby: string = '';
  public lastmoddate: Date = new Date();
  public lastmodby: string = '';

  constructor() {
  }
  setImageid(id: number) {
    this.imageid = id
  }
  setImagebytes(bytes: string) {
    this.imagebytes = bytes
  }
  setImagename(name: string) {
    this.imagename = name
  }
  setImageresult(result: string) {
    this.imageresult = result
  }
  setCreatedDate(date: Date) {
    this.createddate = date
  }
  setCreatedBy(name: string) {
    this.createdby = name
  }
  setLastModDate(date: Date) {
    this.lastmoddate = date
  }
  setLastModBy(name: string) {
    this.lastmodby = name
  }
}
