GAME_EVENT = "GameEvent" # Frontend -> Backend, generic filter event

START_GAME = "StartGame" # Frontend -> Backend
START_GAME_RESPONSE = "StartGameInfo" # Backend -> Frontend; username->userid mapping

NEW_PRESIDENT = "President" # Backend -> Frontend; userid of the president, govtFailCount
REQUEST_NOMINATE_CHANCELLOR = "RequestNominateChancellor" # Backend -> Frontend; userids that can be nominated
NOMINATED_CHANCELLOR = "NominatedChancellor" # Frontend -> Backend; userid of the chancellor
VOTE_CHANCELLOR = "VoteChancellor" # Backend -> Frontend; userid of the chancellor in case voting is required.
VOTE_FOR_CHANCELLOR = "VoteForChancellor" # Frontend -> Backend; yes/no on chancelor election
ELECTED_CHANCELLOR = "ElectedChancellor" # Backend -> Frontend; userid of the chancellor

PRESIDENT_POLICIES_OPTIONS = "PresidentPolicyOptions" # Backend -> Frontend; good/bad policy count
PRESIDENT_POLICIES = "PresidentsChoice" # Frontend -> Backend; good/bad policy count of selected policies
CHANCELLOR_POLICY_OPTIONS = "ChancellorPolicyOptions" # Backend -> Frontend; good/bad policy count of selected policies
CHANCELLOR_POLICY = "ChancellorsChoice" # Frontend -> Backend; good/bad

NEXT_TURN_POLICIES = "BadGuyBonus3" # Backend -> Frontend; good/bad policy count
REQUEST_KILL = "BadGuyBonus45" # Backend->Frontend;
RESPONSE_KILL = "Kill" # Frontend -> Backend; userid of the killed player
BROADCAST_KILL = "Killed" # Backend -> Frontend; userid of the killed player

ANNOUNCE_WINNER = "Winner" # Backend -> Frontend; "Good or Bad"

