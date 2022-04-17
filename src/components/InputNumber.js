import {observer} from "mobx-react-lite";

const InputNumber = observer(({ label, value, onChange }) => {
    return (
        <div style={{display: 'block'}}>
            <span style={{marginRight: '10px'}}>{label}</span>
            <input type="number"
                   pattern="[0-9]*"
                   onInput={onChange}
                   min={0}
                   max={24}
                   value={value} />
        </div>
    );
});

export default InputNumber;
