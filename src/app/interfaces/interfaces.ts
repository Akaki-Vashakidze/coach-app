export interface SessionData {
    userType: string,
    passwordChangeRequired?: boolean,
    user: User,
    contact: {
      email: string,
      phone: string
    }
  }

  export interface LoginInfo {
    pidOrEmail: number;
    password: string;
    userType: string;
  }
  
  export interface Competition {
    _id: string,
    title: string,
    description: string,
    address: string,
    startDate: Date,
    endDate: Date,
    type: string,
    participantApproveType: string,
    creator: string,
    status: string,
    registrationEndDate: Date,
    registrationStartDate: Date,
    statement: {
        hasActiveStatement: boolean,
        participantMaxCount: number
    }
}

export interface SubmitTwoFa {
    token: string;
    uuid: string;
  }

  export interface RecPassStart {
      pidOrEmail: string,
      userType: string,
      target: string,
      targetType: string
  }
  
  export interface PidOrMail {
    pidOrEmail: string;
    userType: string;
  }
  
  export interface RecPassObj {
    data: {
      pidOrEmail: string,
      userType: string,
      target: string,
      targetType: string
    }
  }
  
  export interface GenericResponce<T> {
    result:Result<T>;
  }
  
  export interface Result<T> {
    data:T;
  }

  export interface userInfoForPassChange {
    contact:Contact;
    passwordChangeRequired:boolean;
    user:User;
    userType:string;
  }

  export interface Contact {
    email:string;
    phone:string;
    passwordChangeRequired:boolean;
    userType:string;
  }

  export interface User {
    birthDate:string;
    firstName:string;
    lastName:string;
    pid:string;
    userId:string;
  }
  
  export interface SuccessfulPassChangeDataRes {
    fromDate:string;
    loggedOut:string;
    toDate:string;
    token:string;
    userAgent:string;
    userData:userInfoForPassChange;
    _id:string;
    errors?:{keyword:string}[]
  }

  export interface Team {
    description:string;
    title:string;
    _id:string;
  }

  export interface TeamDetails {
    description:string;
    title:string;
    members:TeamMembers[];
    _id:string;
  }

  export interface TeamMembers {
    athlete?:Athlete;
    coach?:Coach;
    status:string;
    memberType:string;
  }

  export interface Coach {
    _id: string,
    pid: string,
    lastName: string,
    firstName: string,
    birthDate: Date,
    email: string,
    phone: string,
    userType: string,
    status: string,
    gender: string,
    password: string
}

export interface Athlete {
  _id: string,
  sid: string,
  pid: string,
  lastName: string,
  firstName: string,
  birthDate: Date,
  gender: string,
}

export interface TeamAthleteQualifications {
  member:{
    athlete:Athlete,
    memberType:string,
    status:string
  },
  result?: {
    athlete:string,
    event:{
      startDate:string;
      endDate:string;
      event:string
    },
    heat:{heat:string},
    participant:{heatParticipant:string, lane:number}
    partition:{
      partition:string,
      poolLength:string,
      startDate:string,
      startTime:string
    },
    race:{
      distance:number,
      gender:string,
      race:string,
      style:string,
      type:string
    },
    result:{
      time: iTime,
      type:string
    },
    team:string,
    _id:string
  }
}

export interface iTime {
  hours:string,
  milliseconds:string,
  minutes:string,
  seconds:string,
}

export interface EventDetails {
  event:any;
  partitions:Partition[];
  statement:{
    participantMaxCount:number;
    _id:string;
  }
}

export interface Partition {
  _id: string,
  event: string,
  title: string,
  description: string,
  address: string,
  startDate: Date,
  endDate: Date,
  startTime: Date,
  endTime: string,
  poolLength: string,
  poolWidth: number,
  races: Race[]
}

export interface Race {
  _id: string,
  title: string,
  description: string,
  event: string,
  partition: string,
  style: string,
  type: string,
  distance: number,
  gender: string,
  hasFinals: boolean,
  hasSemiFinals: boolean,
  orderNumber: number,
  heats: any,
}