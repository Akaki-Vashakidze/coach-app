export enum UserType {
  ADMIN = 'admin',
  REFEREE = 'referee',
  COACH = 'coach',
  ATHLETE = 'athlete'
}

export enum TeamMemberType {
  COACH = 'coach',
  ATHLETE = 'athlete'
}

export enum ITeamMemberStatus {
  INVITED = 'invited',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  IMPORTED = 'imported'
}

export enum StrokeStyle {
  BUTTERFLY = 'BUTTERFLY',
  BACKSTROKE = 'BACKSTROKE',
  BREASTSTROKE = 'BREASTSTROKE',
  FREESTYLE = 'FREESTYLE',
  MEDLEY = 'MEDLEY',
  RELEY = "RELEY"
}

export enum StrokeDistance {
  M50 = 50,
  M100 = 100,
  M200 = 200,
  M400 = 400,
  M800 = 800,
  M1500 = 1500
}

export enum RaceType {
  INDIVIDUAL = 'INDIVIDUAL',
  RELEY = 'RELEY'
}

export enum GenderType {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum PoolLength {
  SHORT = 'SHORT',
  LONG = 'LONG',
  OPEN_WATER = 'OPEN_WATER'
}
export enum ConfirmationText {
  ENG = 'I agree',
  GEO = 'თანახმა ვარ',
}