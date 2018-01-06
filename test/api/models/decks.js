const Deck = require("../../../api/models/deck");
const data = require("../fixtures/decks");

const deck1 = data.decks[0];
const deck2 = data.decks[1];
const user1 = data.user1;
const user2 = data.user2;

describe("Deck model", () => {
  describe("get", () => {
    it("should return single deck for user", done => {
      Deck.get(deck1._id, user1._id).then(deck => {
        expect(deck._id).to.deep.equal(deck1._id);
        expect(deck.title).to.deep.equal(deck.title);

        done();
      });
    });
  });
  describe("all", () => {
    it("should return all decks for user", done => {
      const decksForUser = data.decks.filter(deck => deck.user === user1._id);

      Deck.all(user1._id).then(decks => {
        expect(decks.length).to.equal(decksForUser.length);

        done();
      });
    });
  });
  describe("create", () => {
    it("should create single deck for user", done => {
      const newDeck = { title: "New deck", description: "New description" };
      Deck.create(newDeck, user1._id).then(deck => {
        expect(deck.title).to.equal(newDeck.title);
        expect(deck.description).to.equal(newDeck.description);
        expect(deck.user).to.deep.equal(user1._id);

        done();
      });
    });
  });
  describe("update", () => {
    it("should update single deck for user", done => {
      const newDeck = { title: "New deck", description: "New description" };
      Deck.update(deck1._id, newDeck, user1._id).then(deck => {
        expect(deck.title).to.equal(newDeck.title);
        expect(deck.description).to.equal(newDeck.description);
        expect(deck.user).to.deep.equal(user1._id);

        done();
      });
    });
    it("should not update fields that are not defined", done => {
      const newDeck = { title: "New deck", description: undefined };
      Deck.update(deck1._id, newDeck, user1._id).then(deck => {
        expect(deck.description).to.be.ok;

        done();
      });
    });
  });
  describe("delete", () => {
    it("should delete single deck for user", done => {
      Deck.all(user1).then(decks => {
        Deck.delete(deck1._id, user1).then(() => {
          Deck.all(user1).then(newDecks => {
            expect(newDecks).to.have.lengthOf(decks.length - 1);

            done();
          });
        });
      });
    });
  });
  describe("deleteAll", () => {
    it("should delete all decks for user", done => {
      Deck.deleteAll(user1).then(() => {
        Deck.all(user1).then(newDecks => {
          expect(newDecks).to.have.lengthOf(0);

          done();
        });
      });
    });
  });
});