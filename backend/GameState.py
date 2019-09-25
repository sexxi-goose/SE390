import random

class GameState:
    def __init__(self, room_id):
        self._room_id = room_id
        self._users = []
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
    
    def join(username):
        if(username in self._users or len(self._users)>=6 or self._game_in_progress):
            return False
        self._users +=[username]
        return True

    def assign_geese():
        self._geese = random.sample(population = self._users, k = 2)
        self._mrgoose = self._geese[0];

    def start_game():
        if(len(self._users) < 5): #not enough players
            return False
        self._deck = ['F']*11 + ["L"]*6
        self._discard_pile = []
        random.shuffle(self._deck)
        assign_geese()

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
        if(policy = 'L'):
            self._num_liberal_passed += 1
        else:
            self._num_fascist_passed += 1

    def vote(username, vote):
        self._votes[username] = vote;
        if(len(self._votes) == len(self._users)):
            tally = sum([1 for v in self._votes if self._votes[v]=="yes"])
            if(tally > len(users)/2):
                return "pass", self._votes
            else:
                return "fail", self._votes
        return "continue",dict()
