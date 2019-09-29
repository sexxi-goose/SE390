import random
import game_sessions
import json
import itertools

USER_ROLE_INFORMATION = "UserRoleInfo"
GEESE_ROLE_INFORMATION = "GeeseRoleInfo"
RESPONSE_GAME_START = "GameStarted"
PRESIDENT_SELECTED = "PresidentSelected"

class GameState:
    def __init__(self, room_id, session):
        self._room_id = room_id
        self._users = []
        self._session = session
        self._num_liberal_passed = 0
        self._num_fascist_passed = 0
        self._election_tracker = 0
        self._deck = ['F']*11 + ["L"]*6
        self._discard_pile = []
        self._geese = []
        self._mrgoose = ""
        self._president = ""
        self._chancellor = ""
        self._votes = dict()
        self._policy_cards = []
        self._game_in_progress = False
        self._pres_cycle = None
        self._temp_chancellor = ""
    
    def join(self,user_id, username):
        if(user_id in self._users or len(self._users)>=6 or self._game_in_progress):
            return False
        self._users +=[user_id]
        return True

    def next_pres():
        self._president = self._pres_cycle[0]
        self._pres_cycle = self._pres_cycle[1:] + self._pres_cycle[:1]

        president_name = self._session._users[self._president]
        self._session.emit_to_users(self._users, PRESIDENT_SELECTED, json.dumps({"president" : president_name}))

    def remove(self,user_id, username):
        if(user_id in self._users):
            self._users.remove(userid)

    def assign_geese():
        self._geese = random.sample(population = self._users, k = 2)
        self._mrgoose = self._geese[0]

    def emit_roles():
        geese_names = [self._session._users[uid] for uid in self._geese]
        mrgoose_name = self._session._users[mrgoose]
        geese_json = json.dumps({"geese" : geese_names, "mrgoose" : mrgoose_name})
        self._session.emit_to_users(self._geese, GEESE_ROLE_INFORMATION, geese_json)

        for i in [uid for uid in users if uid not in self._geese]:
            self._session.emit_to_user(uid, USER_ROLE_INFORMATION, json.dumps({"role" : "student"}))

    def start_game():
        if(len(self._users) < 5):
            raise RuntimeError("Not enough players to start game")

        self._deck = ['F']*11 + ['L']*6
        self._discard_pile = []
        random.shuffle(self._deck)
        assign_geese()
        self._session.emit_to_users(self._users, RESPONSE_GAME_START, "")
        emit_roles()
        self._pres_cycle = self._users[:]
        next_pres()

    def draw(n=3):
        self._policy_cards = []
        for i in range(n):
            if(len(self._deck)==0):
                self._deck = self._discard_pile
                self._discard_pile = []
                random.shuffle(self._deck)
            self._policy_cards.append(self._deck.pop())
        self._session.emit_to_user(self._president, PRESIDENT_POLICIES_OPTIONS, json.dumps({"cards" : self._policy_cards}))

    def president_discard(idx):
        discard(self._policy_cards[idx])
        del self._policy_cards[idx]

    def chancellor_play(idx):
        discard(self._policy_cards[1 - idx])
        del self._policy_cards[idx]
        pass_policy(self._policy_cards[0])
    
    def discard(card):
        self._discard_pile.append(card)

    def pass_policy(policy):
        if policy == 'L':
            self._num_liberal_passed += 1
        else:
            self._num_fascist_passed += 1
        self._session.emit_to_users(self._users, CHANCELLOR_POLICY, json.dumps({"status" : policy}))

    def vote(username, vote):
        self._votes[username] = vote
        if(len(self._votes) == len(self._users)):
            tally = sum([1 for v in self._votes if self._votes[v]=="yes"])
            result = "fail"
            if(tally > len(users)/2):
                self._election_tracker = 0
                elected_chancellor(self._temp_chancellor)
            else:
                self._election_tracker += 1
                if self._election_tracker == 4:
                    pass_policy(self._deck.pop())
                    self._election_tracker = 0
                next_pres()


    def kill(username):
        if username == self._mrgoose:
            self._session.emit_to_users(self._users, ANNOUNCE_WINNER, json.dumps({"winner" : "students"}))
            return

        for i in range(len(self._users)):
            if (self._users[i] == username):
                del self._users[i]
                break
        
        self._session.emit_to_users(self._users, BROADCAST_KILL, json.dumps({"user_id" : username})) 

    def nomination_list():
        nominate = [uid for uid in users if uid not in [self._president, self._chancellor]]
        self._session.emit_to_user(self._president, CANDIDATE_CHANCELLOR, json.dumps({"users" : nominate})) 

    def nominate(username):
        self._temp_chancellor = username
        self._session.emit_to_user(self._president, VOTE_CHANCELLOR, json.dumps({"user_id" : username})) 


    def elected_chancellor(username):
        if self._num_fascist_passed >= 3 and username == self._mrgoose:
            self._session.emit_to_users(self._users, ANNOUNCE_WINNER, json.dumps({"winner" : "geese"}))
            return
        self._chancellor = username
        self._session.emit_to_users(self.users, ELECTED_CHANCELLOR, json.dumps({"user_id" : username}))


