import random
import os

WORDS = [
    "python", "linux", "terminal", "keyboard", "function",
    "variable", "program", "developer", "repository", "branch",
    "commit", "container", "kernel", "fedora", "escript",
    "compiler", "network", "algorithm", "database", "interface"
]

HANGMAN_STAGES = [
    """
       -----
       |   |
           |
           |
           |
           |
    =========
    """,
    """
       -----
       |   |
       O   |
           |
           |
           |
    =========
    """,
    """
       -----
       |   |
       O   |
       |   |
           |
           |
    =========
    """,
    """
       -----
       |   |
       O   |
      /|   |
           |
           |
    =========
    """,
    """
       -----
       |   |
       O   |
      /|\\  |
           |
           |
    =========
    """,
    """
       -----
       |   |
       O   |
      /|\\  |
      /    |
           |
    =========
    """,
    """
       -----
       |   |
       O   |
      /|\\  |
      / \\  |
           |
    =========
    """
]

def clear():
    os.system("cls" if os.name == "nt" else "clear")

def display(word, guessed, wrong):
    clear()
    print(HANGMAN_STAGES[wrong])
    print(f"  Attempts left: {6 - wrong}")
    print(f"  Wrong guesses: {', '.join(sorted(guessed - set(word))) or 'None'}\n")
    display_word = " ".join(c if c in guessed else "_" for c in word)
    print(f"  Word: {display_word}\n")

def play():
    word = random.choice(WORDS)
    guessed = set()
    wrong = 0

    print("\n  🎮 Welcome to Terminal Hangman!\n")
    input("  Press Enter to start...")

    while wrong < 6 and not all(c in guessed for c in word):
        display(word, guessed, wrong)
        guess = input("  Guess a letter: ").strip().lower()

        if len(guess) != 1 or not guess.isalpha():
            print("  ⚠  Please enter a single letter.")
            input("  Press Enter to continue...")
            continue

        if guess in guessed:
            print("  ⚠  You already guessed that!")
            input("  Press Enter to continue...")
            continue

        guessed.add(guess)

        if guess not in word:
            wrong += 1
            print(f"  ✗ '{guess}' is not in the word!")
            input("  Press Enter to continue...")

    clear()
    print(HANGMAN_STAGES[wrong])

    if all(c in guessed for c in word):
        print(f"  🎉 You won! The word was: {word.upper()}\n")
    else:
        print(f"  💀 Game over! The word was: {word.upper()}\n")

    again = input("  Play again? (y/n): ").strip().lower()
    if again == "y":
        play()
    else:
        print("\n  Thanks for playing! Goodbye.\n")

if __name__ == "__main__":
    play()
