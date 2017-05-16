import { TestBed, inject } from '@angular/core/testing';

import { CheckVideoService } from './check-video.service';

describe('CheckVideoService', () => {
  let serv=new CheckVideoService();
  it('should initialise',()=>{
    expect(serv).toBeTruthy();
  })
  it('should refuse link nothing',()=>{
    expect(serv.checkURL("")).toBe(false);
  });
  it('should refuse link www.google.ro',()=>{
    expect(serv.checkURL("www.google.ro")).toBe(false);
  });
  it('should refuse link randomlink',()=>{
    expect(serv.checkURL("randomlink")).toBe(false);
  });
  it('should refuse link www.youtube.com/11111',()=>{
    expect(serv.checkURL("www.youtube.com/11111")).toBe(false);
  });
  it('should refuse link www.youtube.com/nevergonnagiveyouup',()=>{
    expect(serv.checkURL("www.youtube.com/nevergonnagiveyouu")).toBe(false);
  });
  it('should accept https://www.youtube.com/watch?v=ehzdhKKcgow',()=>{
    expect(serv.checkURL("https://www.youtube.com/watch?v=ehzdhKKcgow")).toBe(true);
  });
  it('should accept https://youtu.be/ehzdhKKcgow',()=>{
    expect(serv.checkURL("https://youtu.be/ehzdhKKcgow")).toBe(true);
  });
  it('should accept www.youtube.com/watch?v=ehzdhKKcgow',()=>{
    expect(serv.checkURL("www.youtube.com/watch?v=ehzdhKKcgow")).toBe(true);
  });
});
