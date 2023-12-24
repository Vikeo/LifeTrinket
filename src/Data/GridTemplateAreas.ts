export enum GridTemplateAreas {
  OnePlayerLandscape = '"player0 player0"',
  OnePlayerPortrait = '"player0" "player0"',
  TwoPlayersOppositeLandscape = '"player0" "player1"',
  TwoPlayersOppositePortrait = '"player0 player1" "player0 player1"',
  TwoPlayersSameSide = '"player0 player1"',
  ThreePlayers = '"player0 player0" "player1 player2"',
  ThreePlayersSide = '"player0 player0 player0 player2" "player1 player1 player1 player2"',
  FivePlayers = '"player0 player0 player0 player1 player1 player1" "player2 player2 player3 player3 player4 player4"',
  FivePlayersSide = '"player0 player0 player0 player0 player0 player1 player1 player1 player1 player1 player2" "player3 player3 player3 player3 player3 player4 player4 player4 player4 player4 player2"',
  SixPlayers = '"player0 player1 player2" "player3 player4 player5"',
  SixPlayersSide = '"player0 player1 player1 player1 player1 player2 player2 player2 player2 player3" "player0 player4 player4 player4 player4 player5 player5 player5 player5 player3"',
}
