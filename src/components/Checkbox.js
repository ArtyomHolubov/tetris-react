import {observer} from "mobx-react-lite";

const Checkbox = observer(({ label, value, onChange }) => {
    return (
        <label>
            <input type="checkbox" checked={value} onChange={onChange} />
            {label}
        </label>
    );
});

export default Checkbox;
