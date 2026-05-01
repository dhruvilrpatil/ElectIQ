
import styles from './QuickChips.module.css';

const CHIPS = [
  'How do I register to vote?',
  'What is an EPIC card?',
  'How does EVM work?',
  'What is NOTA?',
  'Where is my polling booth?',
  'What ID do I need?',
  'What is Model Code of Conduct?',
  'Lok Sabha vs Rajya Sabha?',
  'What is VVPAT?',
  'Can NRIs vote?',
];

function QuickChips({ onChipClick }) {
  return (
    <div className={styles.row} role="list" aria-label="Quick question suggestions about Indian elections">
      {CHIPS.map((chip) => (
        <button
          key={chip}
          type="button"
          role="listitem"
          className={styles.chip}
          onClick={() => onChipClick(chip)}
          aria-label={`Ask: ${chip}`}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}

export default QuickChips;
