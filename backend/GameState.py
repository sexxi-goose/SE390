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
        self._game_in_progress = False
        self._pres_cycle = None
    
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

        for i in [uid for uid in users is uid not in self._geese]:
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
        cards = []
        for i in range(n):
            if(len(self._deck)==0):
                self._deck = self._discard_pile
                random.shuffle(self._deck)
            cards.append(self._deck.pop())
        return cards

    def discard(card):
        self._discard_pile.append(card)

    def pass_policy(policy):
        if policy == 'L':
            self._num_liberal_passed += 1
        else:
            self._num_fascist_passed += 1

    def vote(username, vote):
        self._votes[username] = vote
        if(len(self._votes) == len(self._users)):
            tally = sum([1 for v in self._votes if self._votes[v]=="yes"])
            if(tally > len(users)/2):
                return "pass", self._votes
            else:
                return "fail", self._votes
        return "continue",dict()
