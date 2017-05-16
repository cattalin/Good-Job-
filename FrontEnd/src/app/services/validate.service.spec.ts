import { TestBed, inject } from '@angular/core/testing';

import { ValidateService } from './validate.service';

describe('ValidateService', () => {
  let serv:ValidateService;
  beforeEach(()=>{
    serv=new ValidateService();
  });

  let CorrectUser={
    name:"test",
    email:"test@test.com",
    username:"testtest",
    password: "1werdtfuyghijo"
  };
  let VoidDataUser1={
    name:"test",
    email:"test@test.com",
    username:undefined,
    password: "1werdtfuyghijo"
  };
  let VoidDataUser2={
    name:undefined,
    email:"test@test.com",
    username:"test",
    password: "1werdtfuyghijo"
  };
  let VoidDataUser3={
    name:"test",
    email:undefined,
    username:"test",
    password: "1werdtfuyghijo"
  };
  let wrongEmail={
    name:"test",
    email:"thisisnotanemail",
    username:"test",
    password: "1werdtfuyghijo"
  };
  it("should initialize",()=>{
    expect(serv).toBeTruthy;
  })
  it("test a correct value",()=>{
    expect(serv.validateRegister(CorrectUser)).toBe(true);
    expect(serv.validateEmail(CorrectUser.email)).toBe(true);
  });
  it("test with no username",()=>{
    expect(serv.validateRegister(VoidDataUser1)).toBe(false);
  })
  it("test with no name",()=>{
    expect(serv.validateRegister(VoidDataUser2)).toBe(false);
  })
  it("test with no email",()=>{
    expect(serv.validateRegister(VoidDataUser3)).toBe(false);
  })
  it("test a wrong email",()=>{
    expect(serv.validateEmail(wrongEmail.email)).toBe(false);
  })
});
