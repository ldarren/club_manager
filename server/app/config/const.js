Object.freeze(
leagueDat = {
    home_bonus: 200,
    dp_for_yellow: 4,
    dp_for_red: 10 ,
    suspension_margin: 10,
    max_injury_length: 9,
    num_subs: 5,
    substitutions: 3,
    updtr_fitness_gain: 20,
    updtr_fitness_after_injury: 80,
    team_stats_total: 1,
    cup: 0
});
Object.freeze(
leagueAbilities = {
    AB_Goal: 50,
    AB_Assist: 35,
    AB_Victory_Random: 60,
    AB_Clean_Sheet: 50,
    AB_Ktk: 18,
    AB_Kps: 12,
    AB_Sht_On: 2,
    AB_Sht_Off: 0,
    AB_Sav: 12,
    AB_Defeat_Random: -60,
    AB_Concede: -8,
    AB_Yellow: -8,
    AB_Red: -20
});
Object.freeze(
tacticsDat = [
["TACTIC","N","Normal"],
["TACTIC","D","Defensive"],
["TACTIC","A","Attacking"],
["TACTIC","C","Counter_Attack"],
["TACTIC","L","Long_Ball"],
["TACTIC","P","Passing"],
"MULT N DF TK 1.0",
"MULT N DF PS 0.5",
"MULT N DF SH 0.3",
"MULT N DM TK 0.85",
"MULT N DM PS 0.75",
"MULT N DM SH 0.3",
"MULT N MF TK 0.3",
"MULT N MF PS 1.0",
"MULT N MF SH 0.3",
"MULT N AM TK 0.3",
"MULT N AM PS 0.85",
"MULT N AM SH 0.85",
"MULT N FW TK 0.3",
"MULT N FW PS 0.3",
"MULT N FW SH 1.0",
"MULT D DF TK 1.25",
"MULT D DF PS 0.5",
"MULT D DF SH 0.25",
"MULT D DM TK 1.13",
"MULT D DM PS 0.68",
"MULT D DM SH 0.25",
"MULT D MF TK 1.0",
"MULT D MF PS 0.75",
"MULT D MF SH 0.25",
"MULT D AM TK 0.75",
"MULT D AM PS 0.65",
"MULT D AM SH 0.5",
"MULT D FW TK 0.5",
"MULT D FW PS 0.25",
"MULT D FW SH 0.75",
"BONUS D L DF TK 0.25",
"MULT A DF TK 1.0",
"MULT A DF PS 0.5",
"MULT A DF SH 0.5",
"MULT A DM TK 0.5",
"MULT A DM PS 0.75",
"MULT A DM SH 0.68",
"MULT A MF TK 0.0",
"MULT A MF PS 1.0",
"MULT A MF SH 0.75",
"MULT A AM TK 0.0",
"MULT A AM PS 0.87",
"MULT A AM SH 1.13",
"MULT A FW TK 0.0",
"MULT A FW PS 0.75",
"MULT A FW SH 1.5",
"MULT C DF TK 1.0",
"MULT C DF PS 0.5",
"MULT C DF SH 0.25",
"MULT C DM TK 0.85",
"MULT C DM PS 0.85",
"MULT C DM SH 0.25",
"MULT C MF TK 0.5",
"MULT C MF PS 1.0",
"MULT C MF SH 0.25",
"MULT C AM TK 0.5",
"MULT C AM PS 0.85",
"MULT C AM SH 0.65",
"MULT C FW TK 0.5",
"MULT C FW PS 0.5 ",
"MULT C FW SH 1.0",
"BONUS C A MF SH 0.5",
"BONUS C A DF PS 0.25",
"BONUS C A DF SH 0.25",
"BONUS C P MF SH 0.5",
"BONUS C P DF PS 0.25",
"BONUS C P DF SH 0.25",
"MULT L DF TK 1.0",
"MULT L DF PS 0.25",
"MULT L DF SH 0.25",
"MULT L DM TK 0.75",
"MULT L DM PS 0.85",
"MULT L DM SH 0.38",
"MULT L MF TK 0.5",
"MULT L MF PS 1.0",
"MULT L MF SH 0.5 ",
"MULT L AM TK 0.45",
"MULT L AM PS 0.85",
"MULT L AM SH 0.9",
"MULT L FW TK 0.25",
"MULT L FW PS 0.5 ",
"MULT L FW SH 1.3",
"BONUS L C DF TK 0.25",
"BONUS L C DF PS 0.5",
"MULT P DF TK 1.0",
"MULT P DF PS 0.75",
"MULT P DF SH 0.3 ",
"MULT P DM TK 0.87",
"MULT P DM PS 0.87",
"MULT P DM SH 0.28",
"MULT P MF TK 0.25",
"MULT P MF PS 1.0",
"MULT P MF SH 0.25",
"MULT P AM TK 0.25",
"MULT P AM PS 0.87",
"MULT P AM SH 0.68",
"MULT P FW TK 0.25",
"MULT P FW PS 0.75",
"MULT P FW SH 1.0",
"BONUS P L MF SH 0.5",
"BONUS P L MF TK 0.5",
"BONUS P L FW SH 0.25"
]);
Object.freeze(
languageDat = [
// A scoring chance
// 1st %s - game minute
// 2nd %s - team abbrevation
// 3rd %s - player name
["CHANCE", "\nMin. %s :(%s) %s with the dribble"],
["CHANCE", "\nMin. %s :(%s) %s takes possesion"],
["CHANCE", "\nMin. %s :(%s) %s cuts through the defense"],
["CHANCE", "\nMin. %s :(%s) %s finds a hole in the defense"],
["CHANCE", "\nMin. %s :(%s) %s takes advantage of a defensive mistake"],
["CHANCE", "\nMin. %s :(%s) %s finds his way through"],
["CHANCE", "\nMin. %s :(%s) %s sidesteps his marker"],
["CHANCE", "\nMin. %s :(%s) %s with a flashy move"],
["CHANCE", "\nMin. %s :(%s) %s beats his marker"],
["CHANCE", "\nMin. %s :(%s) %s with a real burst of pace"],
["CHANCE", "\nMin. %s :(%s) %s bursts forward"],
["CHANCE", "\nMin. %s :(%s) %s finds himself in a good position"],
// An assisted scoring chance
// 1st %s - game minute
// 2nd %s - team abbrevation
// 3rd %s - player making the pass
// 4th %s - player receiving the pass
["ASSISTEDCHANCE", "\nMin. %2s :(%s) %s passes the ball to %s"],
["ASSISTEDCHANCE", "\nMin. %2s :(%s) %s with a smart pass to %s"],
["ASSISTEDCHANCE", "\nMin. %2s :(%s) %s finds %s in the box"],
["ASSISTEDCHANCE", "\nMin. %s :(%s) %s with a precise pass to %s"],
["ASSISTEDCHANCE", "\nMin. %s :(%s) %s heads the ball down to %s"],
["ASSISTEDCHANCE", "\nMin. %s :(%s) %s slides the ball across to %s"],
["ASSISTEDCHANCE", "\nMin. %s :(%s) %s cuts the ball back to %s"],
["ASSISTEDCHANCE", "\nMin. %s :(%s) %s with the heel pass to %s"],
["ASSISTEDCHANCE", "\nMin. %s :(%s) %s plays a long ball to %s"],
["ASSISTEDCHANCE", "\nMin. %s :(%s) %s with a glorious long pass to %s"],
// A key tackle (scoring chance prevented)
// 1st %s - player name
["TACKLE", "\n          ...  Cleared by %s"],
["TACKLE", "\n          ...  Blocked by %s"],
["TACKLE", "\n          ...  %s wins the ball with a clear tackle"],
["TACKLE", "\n          ...  Intercepted by %s"],
["TACKLE", "\n          ...  %s gets in the way and wins the ball"],
["TACKLE", "\n          ...  But %s clears the danger"],
["TACKLE", "\n          ...  But %s clears the ball to safety"],
["TACKLE", "\n          ...  But %s wins the ball with a sliding challenge"],
["TACKLE", "\n          ...  But %s wins the tackle"],
["TACKLE", "\n          ...  But %s reads the situation well and wins the ball"],
// A shot to goal
// 1st %s - player name
["SHOT", "\n          ...  A powerful shot by %s !"],
["SHOT", "\n          ...  %s tries to beat the keeper !"],
["SHOT", "\n          ...  %s with the strike !"],
["SHOT", "\n          ...  %s shoots towards goal !"],
["SHOT", "\n          ...  %s tries to chip the ball over the keeper !"],
["SHOT", "\n          ...  %s with the shot !"],
["SHOT", "\n          ...  %s chases it through, he must score !"],
["SHOT", "\n          ...  %s is one of one with the keeper, he shoots !"],
["SHOT", "\n          ...  %s goes for goal !"],
["SHOT", "\n          ...  A vicious shot by %s !"],
// A save (by the goalkeeper)
// 1st %s - goalkeeper name
["SAVE", "\n          ...  Saved by %s"],
["SAVE", "\n          ...  %s gathers it comfortably"],
["SAVE", "\n          ...  %s makes a comfortable save"],
["SAVE", "\n          ...  But %s makes a fine save"],
["SAVE", "\n          ...  %s makes a good save"],
["SAVE", "\n          ...  %s parries it"],
["SAVE", "\n          ...  %s makes a difficult save"],
["SAVE", "\n          ...  But %s with the difficult save"],
["SAVE", "\n          ...  But %s reaches the ball. Good save"],
["SAVE", "\n          ...  But %s punches it away"],
// Shot going off target
["OFFTARGET", "\n          ...  But it goes wide"],
["OFFTARGET", "\n          ...  But it goes wide of the post"],
["OFFTARGET", "\n          ...  Over the bar"],
["OFFTARGET", "\n          ...  It goes wide for a goal kick"],
["OFFTARGET", "\n          ...  But it clips the post and goes wide"],
["OFFTARGET", "\n          ...  But it whistles just past the post"],
["OFFTARGET", "\n          ...  But it goes just over"],
["OFFTARGET", "\n          ...  But he puts it wide"],
["OFFTARGET", "\n          ...  But he puts it into the crowd"],
["OFFTARGET", "\n          ...  Wide of goal"],
// The shot resulted in a goal
["GOAL", "\n          ...  GOAL !!"],
// The goal was cancelled
["GOALCANCELLED", "\n          ...  But it's been disallowed. The linesman raised his flag"],
["GOALCANCELLED", "\n          ...  But it's been disallowed. The referee spotted something"],
["GOALCANCELLED", "\n          ...  But it's been disallowed. The linesman flags for offside"],
// An injury
// 1st %s - minute
// 2nd %s - team abbrevation
// 3rd %s - the injured player
["INJURY", "\nMin. %s :(%s) %s injured. He's unable to continue"],
["INJURY", "\nMin. %s :(%s) %s injured. He's been stretchered off"],
["INJURY", "\nMin. %s :(%s) %s falls badly. He's unable to continue"],
// An injury
// 1st %s - minute
// 2nd %s - team abbrevation
// 3rd %s - player name
// 4th %s - new position
["CHANGEPOSITION", "\nMin. %s :(%s) %s will now play as %s"],
// A substitution
// 1st %s - minute
// 2nd %s - team abbrevation
// 3rd %s - player-in name
// 4th %s - player-out name
// 5th %s - the position he'll play
["SUB", "\nMin. %s :(%s) %s will come on for %s and play %s"],
// The team has no substitutions left
["NOSUBSLEFT", "\n          ...  They have no substitutions left. Will play a man down"],
// Tactic change
// 1st %s - minute
// 2nd %s - team abbrevation
// 3rd %s - team abbrevation
// 4th %s - new tactic
["CHANGETACTIC", "\nMin. %s :(%s) %s will now play %s"],
// A foul
// 1st %s - minute
// 2nd %s - team abbrevation
// 3rd %s - fouling player
["FOUL", "\nMin. %s :(%s) %s with the foul"],
["FOUL", "\nMin. %s :(%s) %s with a nasty foul"],
["FOUL", "\nMin. %s :(%s) %s fouls badly"],
["FOUL", "\nMin. %s :(%s) %s with a bad challenge"],
["FOUL", "\nMin. %s :(%s) %s with an ugly foul"],
// A penalty was a awarded
// 1st %s - player taking the penalty
["PENALTY", "\n          ...  PENALTY !! \n          ...  %s will take it"],
["PENALTY", "\n          ...  PENALTY !! \n          ...  %s takes it"],
["PENALTY", "\n          ...  PENALTY !! \n          ...  %s with the spot kick"],
// The fouling player has been warned by the referee
["WARNED", "\n          ...  He is warned by the ref"],
["WARNED", "\n          ...  The referee calls him for a talk"],
["WARNED", "\n          ...  The ref warns him"],
// The fouling player has been given a yellow card
["YELLOWCARD", "\n          ...  He gets a yellow card"],
["YELLOWCARD", "\n          ...  Shown a yellow card"],
["YELLOWCARD", "\n          ...  He is booked for that one"],
// The fouling player has been given a 2nd yellow card (and was sent off)
["SECONDYELLOWCARD", "\n          ...  It's his second ! Sent off !"],
["SECONDYELLOWCARD", "\n          ...  His 2nd yellow this game ! Sent off !"],
["SECONDYELLOWCARD", "\n          ...  His 2nd yellow this game ! Sent off !"],
// The fouling player has been given a red card
["REDCARD", "\n          ...  The ref sends him off the pitch !!"],
["REDCARD", "\n          ...  It's a red card !! End of the game for him"],
["REDCARD", "\n          ...  Shown a red card !!"],
// Various statistic and informational lines printed in the
// commentary file
["COMM_KICKOFF",  "\n*************  KICK OFF  *****************"],
["COMM_HALFTIME", "\n*************  HALF TIME  ****************"],
["COMM_FULLTIME", "\n*************  FULL TIME  ****************"],
["COMM_SHOTSOFFTARGET", "\nShots off target"],
["COMM_SHOTSONTARGET", "\nShots on target"],
["PENALTYSHOOTOUT", "\n***********  PENALTY SHOOTOUT  ***********"],
["WONPENALTYSHOOTOUT", "\n\n          ...  %s wins the penalty shootout"],
["COMM_SCORE", "\nScore"],
["COMM_INJURYTIME", "\nThe ref adds %s min. of injury time"],
["COMM_STATISTICS", "Player statistics for: %s"],
// For updtr
["UPDTR_SKILL_INCREASE", "%s (%s) %s increases"],
["UPDTR_SKILL_DECREASE", "%s (%s) %s decreases"],
["UPDTR_SUSPENDED_1", "%s (%s) is suspended for one game"],
["UPDTR_SUSPENDED_N", "%s (%s) is suspended for %d games"],
["UPDTR_INJURY_NONE", "%s (%s) shakes off a minor injury"],
["UPDTR_INJURY_NONE", "%s (%s) got a doctor's permission to play"],
["UPDTR_INJURY_NONE", "%s (%s) passed a fitness test"],
["UPDTR_INJURY_1", "%s (%s) is injured for one week with a bruised knee"],
["UPDTR_INJURY_1", "%s (%s) is injured for one week with a bruised hand"],
["UPDTR_INJURY_1", "%s (%s) is injured for one week with a gashed hip"],
["UPDTR_INJURY_LIGHT", "%s (%s) is injured for %d weeks with a groin strain"],
["UPDTR_INJURY_LIGHT", "%s (%s) is injured for %d weeks with a sprained knee"],
["UPDTR_INJURY_LIGHT", "%s (%s) is injured for %d weeks with a sprained ankle"],
["UPDTR_INJURY_LIGHT", "%s (%s) is injured for %d weeks with a twisted ankle"],
["UPDTR_INJURY_LIGHT", "%s (%s) is injured for %d weeks with a knee inflammation"],
["UPDTR_INJURY_HARD", "%s (%s) is injured for %d weeks with a torn hamstring"],
["UPDTR_INJURY_HARD", "%s (%s) is injured for %d weeks with a broken arm"],
["UPDTR_INJURY_HARD", "%s (%s) is injured for %d weeks with a ruptured ligament"],
["UPDTR_INJURY_HARD", "%s (%s) is injured for %d weeks with a torn achilles tendon"],
["UPDTR_INJURY_HARD", "%s (%s) is injured for %d weeks with a broken ankle"],
["UPDTR_INJURY_HARD", "%s (%s) is injured for %d weeks with a torn knee cartilage"],
["UPDTR_END_SUSPENSION", "%s (%s) is coming back from suspension"],
["UPDTR_END_INJURY", "%s (%s) is coming back from injury"]
]);

