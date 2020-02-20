import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';

/**
    Допиши конвертер валют.
    - Если пользователь ввел значение в рублях, то количество евро обновляется согласно курсу
    - Если пользователь ввел значение в евро, то количество рублей обновляется согласно курсу
 */

const RUBLES_IN_ONE_EURO = 70;

class MoneyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRub: 0,
      valueEur: 0
    };
  }

  render() {
    return (
      <div className="root">
        <div className="form">
          <h2>Конвертер валют</h2>
          <div>
            <span>&#8381;</span>
            <Money
              value={this.state.valueRub}
              onChange={this.onRubChange}
            />
            &mdash;
            <Money
              value={this.state.valueEur}
              onChange={this.onEurChange}
            />
            <span>&euro;</span>
          </div>
        </div>
      </div>
    );
  }

  onRubChange = value => {
    this.setState({
      valueRub: value,
      valueEur: Math.round(100 * value / RUBLES_IN_ONE_EURO) / 100
    })
  };

  onEurChange = value => {
    this.setState({
      valueEur: value,
      valueRub: Math.round(100 * value * RUBLES_IN_ONE_EURO) / 100
    })
  };
}

function Money({ value, onChange }) {
  const handleChange = event => {
    onChange(extractNumberString(event.target.value));
  };

  return <input type="text" value={value} onChange={handleChange} />;
}

Money.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func
};

function extractNumberString(value) {
  const str = value.replace(/^0+/g, '').replace(/[^\.0-9]/g, '');
  const parts = str.split('.');
  return parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : str;
}

ReactDom.render(<MoneyConverter />, document.getElementById('app'));

/**
    Подсказки:
    - Сейчас каждый компонент Money хранит свое значение в собственном состоянии,
      чтобы конвертер работал, нужно уметь обновлять значение извне, поэтому нужно получать его из props.
    - В MoneyConverter наоборот надо создать состояние, которое будет хранить значения в обеих валютах.
      Таким образом ты сделаешь Lift State Up.
    - Заметь, что компонент Money теперь не содержит состояние и его можно переделать в функциональный компонент.
 */
