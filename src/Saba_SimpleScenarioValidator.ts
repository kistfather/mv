module Saba {
export module SimpleScenario {



export var validates: {[commandName: string]: {[paramName: string]: Array<Validator> | Validator}} = {};


export interface Validator {
    validate(ontext: Context, paramName: string, value: string): void;
    priority(): number;
}
export class NumericValidator implements Validator {
    constructor(private _lowerLimit: number, private _upperLimit?: number, private _type?: string) {
    }
    validate(context: Context, paramName: string, value: string): void {
        if (this._type && context.headerStr[this._type] === 'const') {
            return;
        }
        if (value === undefined) {
            return;
        }
        const num = parseInt(value);
        if (isNaN(num)) {
            context.error(`param: ${paramName} の型がただしくありません。必要なもの: number。設定されたもの: ${value}`);
            return;
        }

        if (this._lowerLimit > num) {
            context.error(`param: ${paramName} の値がただしくありません。最低値: ${this._lowerLimit}。設定されたもの: ${value}`);
        }
        if (this._upperLimit == null) {
            return;
        }
        if (this._upperLimit < num) {
            context.error(`param: ${paramName} の値がただしくありません。最大値: ${this._upperLimit}。設定されたもの: ${value}`);
        }
    }
    priority(): number {
        return 10;
    }
}
export class NotEmptyValidator implements Validator {
    validate(context: Context, paramName: string, value: string): void {
        if (value == null) {
            context.error(`param: ${paramName} は必須です。`);
        }
    }
    priority(): number {
        return 20;
    }
}
export class NumericParamValidator implements Validator {
    constructor(private _target: string) {
    }
    validate(context: Context, paramName: string, value: string): void {
        if (value === undefined) {
            return;
        }
        const num = parseInt(value);
        if (isNaN(num)) {
            context.error(`param: ${paramName} の型がただしくありません。必要なもの: number。設定されたもの: ${value}`);
            return;
        }

        var target = context.headerInt(this._target);
        if (target > num) {
            context.error(`param: ${paramName} の値がただしくありません。最低値: ${this._target}。設定されたもの: ${value}`);
        }
    }
    priority(): number {
        return 0;
    }
}

export class ListValidator implements Validator {
    constructor(private _target: string[]) {
    }
    validate(context: Context, paramName: string, value: string): void {
        if (value === undefined) {
            return;
        }
        if (this._target.indexOf(value) === -1) {
            context.error(`param: ${paramName} の値がただしくありません。必要値: ${JSON.stringify(this._target)}。設定されたもの: ${value}`);
        }
    }
    priority(): number {
        return 5;
    }
}
export class RegExpValidator implements Validator {
    constructor(private _target: RegExp) {
    }
    validate(context: Context, paramName: string, value: string): void {
        if (value === undefined) {
            return;
        }
        if (! this._target.exec(value)) {
            context.error(`param: ${paramName} の値がただしくありません。設定されたもの: ${value}`);
        }
    }
    priority(): number {
        return 5;
    }
}
export class VarValidator implements Validator {
    constructor(private _target: RegExp) {
    }
    validate(context: Context, paramName: string, value: string): void {
        if (value === undefined) {
            return;
        }
        var ret = this._target.exec(value);
        if (! ret) {
            context.error(`param: ${paramName} の値がただしくありません。設定されたもの: ${value}`);
        }
        var vId = parseInt(ret[2]);
        if (vId < 1) {
            context.error(`param: ${paramName} の値がただしくありません。最低値: ${1}。設定されたもの: ${vId}`);
        }
    }
    priority(): number {
        return 5;
    }
}
export class VarValidator2 implements Validator {
    constructor(private _type: string) {
    }
    validate(context: Context, paramName: string, value: string): void {
        if (value === undefined) {
            return;
        }
        if (this._type && context.headerStr[this._type] === 'var') {
            return;
        }
        const num = parseInt(value);
        if (isNaN(num)) {
            context.error(`param: ${paramName} の型がただしくありません。必要なもの: number。設定されたもの: ${value}`);
            return;
        }

        var lowerLimit = 0;
        if (lowerLimit > num) {
            context.error(`param: ${paramName} の値がただしくありません。最低値: ${lowerLimit}。設定されたもの: ${value}`);
        }
    }
    priority(): number {
        return 5;
    }
}

export const isNumeric = (lowerLimit: number, upperLimit?: number, type?: string): Validator => {
    return new NumericValidator(lowerLimit, upperLimit, type);
};
export const isNumericParam = (paramName: string): Validator => {
    return new NumericParamValidator(paramName);
};
export const notEmpty = (): Validator => {
    return new NotEmptyValidator();
};
export const list = (...arg: string[]): Validator => {
    return new ListValidator(arg);
};
export const isBool = (): Validator => {
    return new ListValidator(['true', 'false']);
};
export const regCheck = (reg: RegExp): Validator => {
    return new RegExpValidator(reg);
};
export const varCheck = (reg: RegExp): Validator => {
    return new VarValidator(reg);
};
export const varCheck2 = (str: string): Validator => {
    return new VarValidator2(str);
};

validates['n1'] = {
    'face':     isNumeric(0),
    'pose':     isNumeric(0),
    'hoppe':    isNumeric(0),
    'position':  list('right', 'left', 'center'),
};
validates['n2'] = validates['n3'] = validates['n4'] = validates['n5'] = validates['n6'] = validates['n7'] = validates['n8'] = validates['n9'] = validates['n10'] = validates['n11'] = validates['n12'] = validates['n13'] = validates['n14'] = validates['n1'];
validates['a1'] = validates['a2'] = validates['a3'] = validates['a4'] = validates['a5'] = validates['a6'] = validates['a7'] = validates['a8'] = validates['a9'] = validates['n1'];

validates['m1'] = {
    'index':     isNumeric(0),
};
validates['m2'] = validates['m3'] = validates['m4'] = validates['m5'] = validates['m6'] = validates['m7'] = validates['m8'] = validates['m9'] = validates['m1'];
validates['mob1'] = {
    'name':     notEmpty()
};
validates['mob2'] = validates['mob3'] = validates['mob4'] = validates['mob5'] = validates['mob6'] = validates['mob7'] = validates['mob8'] = validates['mob9'] = validates['mob1'];

validates['cos1'] = {
};
validates['cos2'] = validates['cos3'] = validates['cos4'] = validates['cos5'] = validates['cos6'] = validates['cos7'] = validates['cos8'] = validates['cos9'] = validates['cos1'];
validates['messages'] = {};
validates['normal_messages'] = {};
validates['not_close'] = {
    'flag':     list('on', 'off')
};
validates['return'] = {};
validates['event_break'] = {};
validates['start'] = {};
validates['hide'] = {};
validates['else'] = {};
validates['return'] = {};
validates['hide_left'] = {};
validates['hide_right'] = {};
validates['hide_center'] = {};
validates['color'] = {};
validates['default_pos'] = {
    'actor': [
                notEmpty(),
                isNumeric(1)
    ],
    'position':  list('right', 'left', 'center'),
};

validates['turn_left'] = {
    'event': [
                isNumeric(-1)
    ],
    'skip':     isBool(),
    'wait':     isBool()
};
validates['turn_up'] = validates['turn_down'] = validates['turn_right'] = validates['turn_left'];
validates['move_up'] = validates['move_down'] = validates['move_right'] = validates['move_left'] = validates['turn_left'];
validates['step_anime_on'] = validates['step_anime_off'] = validates['turn_left'];

validates['end'] = {};
validates['end_else'] = {};
validates['vehicle'] = {};
validates['choice_end'] = {};
validates['menu_open'] = {};
validates['save_open'] = {};
validates['gameover'] = {};
validates['title_return'] = {};
validates['fadein'] = {};
validates['fadeout'] = {};


validates['message_h'] = {
    'index':    isNumeric(0, 7),
    'back':     isNumeric(0, 2),
    'pos':      isNumeric(0, 29)
};

validates['message'] = {
    'value':    notEmpty()
};


validates['choice_h'] = {
    'cancel':   isNumeric(0, 5)
};

validates['choice_if'] = {
    'index': [
                notEmpty(),
                isNumeric(1, 4)
    ]
};

validates['input_num'] = {
    'var': [
                notEmpty(),
                isNumeric(1)
    ],
    'num': [
                notEmpty(),
                isNumeric(1, 8),
    ]
};

validates['choice_item'] = {
    'var': [
                notEmpty(),
                isNumeric(1)
    ]
};

validates['map_move'] = {
    'type':     list('const', 'var'),
    'map': [
                notEmpty(),
                isNumeric(1)
    ],
    'x': [
                notEmpty(),
                isNumeric(0),
                varCheck2('type')
    ],
    'y': [
                notEmpty(),
                isNumeric(0),
                varCheck2('type')
    ],
    'direction': list('0', '2', '4', '6', '8', 'left', 'right', 'up', 'down'),
    'fade':     list('0', '1', '2', 'black', 'white', 'none'),
};

validates['vehicle_pos'] = {
    'vehicle': [
                notEmpty(),
                isNumeric(0, 2)
    ],
    'type':     list('const', 'var'),
    'map': [
                notEmpty(),
                isNumeric(1)
    ],
    'x': [
                notEmpty(),
                isNumeric(0),
                varCheck2('type')
    ],
    'y': [
                notEmpty(),
                isNumeric(0),
                varCheck2('type')
    ]
};

validates['event_pos'] = {
    'id': [
                notEmpty(),
                isNumeric(-1)
    ],
    'type':     list('const', 'var', 'target'),
    'x': [
                notEmpty(),
                isNumeric(0),
                varCheck2('type')
    ],
    'y': [
                notEmpty(),
                isNumeric(0),
                varCheck2('type')
    ],
    'direction':list('0', '2', '4', '6', '8', 'left', 'right', 'up', 'down')
};

validates['scroll_map'] = {
    'direction': [
                notEmpty(),
                list('2', '4', '6', '8', 'left', 'right', 'up', 'down')
    ],
    'num': [
                notEmpty(),
                isNumeric(0, 100)
    ],
    'speed': [
                isNumeric(1, 6)
    ]
};

validates['scroll_h'] = {
    'speed': [
                notEmpty(),
                isNumeric(1, 8)
    ],
    'noskip':   isBool()
};

validates['scroll'] = {
    'value' :   notEmpty()
};

validates['if_sw'] = {
    'id': [
                notEmpty(),
                isNumeric(1)
    ],
    'flag':     list('on', 'off')
};

validates['if_var'] = {
    'id': [
                notEmpty(),
                isNumeric(1)
    ],
    'value': [
                notEmpty(),
                regCheck(/^[-+]{0,1}(var\.){0,1}\d+$/),
                varCheck(/^[-+]{0,1}(var\.){0,1}(\d+)$/)
    ],
    'op':        list('=', '>=', '<=', '>', '<', '><')
};

validates['if_self_sw'] = {
    'id': [
                notEmpty(),
                list('A', 'B', 'C', 'D')
    ],
    'flag':     list('on', 'off')
};

validates['if_timer'] = {
    'time': [
                notEmpty(),
                isNumeric(0, 5999)
    ],
    'op':       list('>=', '<=')
};
  
validates['if_actor'] = {
    'id': [
                notEmpty(),
                isNumeric(1)
    ],
    'type':     list('party', 'name', 'class', 'skill', 'weapon',
              'armor', 'state')
};
  
validates['if_enemy'] = {
    'enemy': [
                notEmpty(),
                isNumeric(1)
    ],
    'type':     list('visible', 'state'),
    'value':    isNumeric(1)
};

validates['if_character'] = {
    'id': [
                notEmpty(),
                isNumeric(-1)
    ],
    'direction': [
                notEmpty(),
                list('2', '4', '6', '8', 'left', 'right', 'up', 'down')
    ],
};

validates['if_vehicle'] = {
    'vehicle': [
                notEmpty(),
                isNumeric(0, 2)
    ]
};
  
validates['if_money'] = {
    'money': [
                notEmpty(),
                isNumeric(0)
    ],
    'op':       list('>=', '<=', '<')
};
  
validates['if_item'] = {
    'id': [
                notEmpty(),
                isNumeric(1)
    ]
};

validates['if_weapon'] = {
    'id': [
                notEmpty(),
                isNumeric(1)
    ],
    'equip':    isBool()
};

validates['if_armor'] = {
    'id': [
                notEmpty(),
                isNumeric(1)
    ],
    'equip':    isBool()
};

validates['if_button'] = {
    'button': [
                notEmpty(),
                list('2', '4', '6', '8',
                '11', '12', '13', '14', '15', '16', '17', '18',
                'down', 'left', 'right',
                'up', 'A', 'B', 'C', 'X', 'Y', 'Z', 'L', 'R')
    ]
};

validates['if_script'] = {
  'script':     notEmpty()
};
  
validates['common'] = {
    'id': [
                notEmpty(),
                isNumeric(1)
    ]
};

validates['label'] = {
    'value':    notEmpty()
};

validates['label_jump'] = {
    'value':    notEmpty()
};
              
validates['common'] = {
    'id': [
                notEmpty(),
                isNumeric(1)
    ]
};

validates['sw'] = {
    'id': [
                notEmpty(),
                isNumeric(1)
    ],
    'end':      isNumericParam('id'),
    'flag': [
                notEmpty(),
                list('on', 'off')
    ],
};

validates['var'] = {
    'id': [
                notEmpty(),
                isNumeric(1)
    ],
    'end':      isNumericParam('id'),
    'op': [
                notEmpty(),
                list('=', '+', '-', '*', '/', '%'),
    ],
    'value': [
                notEmpty(),
                regCheck(/^[-+]{0,1}(var\.){0,1}\d+$/),
    ],
};


validates['self_sw'] = {
    'id': [
                notEmpty(),
                list('A', 'B', 'C', 'D')
    ],
    'flag': [
                notEmpty(),
                list('on', 'off')
    ]
};

validates['timer'] = {
    'flag': [
                notEmpty(),
                list('on', 'off')
    ],
    'time':     isNumeric(1, 5999)
};

validates['save_disable'] = {
    'flag':     isBool()
};

validates['menu_disable'] = {
    'flag':     isBool()
};

validates['encount_disable'] = {
    'flag':     isBool()
};

validates['formation_disable'] = {
    'flag':     isBool()
};

validates['transparent'] = {
    'flag':     isBool()
};

validates['followers'] = {
    'flag':     isBool()
};
validates['gather'] = {};
validates['erace'] = {};

validates['anime'] = {
    'target': [
                notEmpty(),
                isNumeric(-1)
    ],
    'anime': [
                notEmpty(),
                isNumeric(1)
    ],
    'wait':     isBool()
};
validates['route_h'] = {
    'event': [
                notEmpty(),
                isNumeric(-1)
    ],
    'repeat':   isBool(),
    'skip':     isBool(),
    'wait':     isBool()
};

validates['balloon'] = {
    'target': [
                notEmpty(),
                isNumeric(-1)
    ],
    'balloon': [
                notEmpty(),
                isNumeric(1)
    ],
    'wait': [
                isBool()
    ]
};

validates['tone'] = {
    'red':      isNumeric(-255, 255),
    'green':    isNumeric(-255, 255),
    'blue':     isNumeric(-255, 255),
    'gray':     isNumeric(0, 255),
    'time':     isNumeric(1, 600),
    'wait':     isBool()
};

validates['flash'] = {
    'red':      isNumeric(0, 255),
    'green':    isNumeric(0, 255),
    'blue':     isNumeric(0, 255),
    'strength': isNumeric(0, 255),
    'time':     isNumeric(1, 600),
    'wait':     isBool()
};

validates['shake'] = {
    'strength': isNumeric(1, 9),
    'speed':    isNumeric(1, 9),
    'time':     isNumeric(1, 600),
    'wait':     isBool(),
};

validates['wait'] = {
    'time': isNumeric(1, 999)
};

validates['picture'] = {
    'layer': [
                notEmpty(),
                isNumeric(1, 100)
              ],
    'file':     notEmpty(),
    'origin':   list('ul', 'center'),
    'type':     list('const', 'var'),
    'x': [
                notEmpty(),
                isNumeric(-9999, 9999, 'type'),
                varCheck2('type'),
    ],
    'y': [
                notEmpty(),
                isNumeric(-9999, 9999, 'type'),
                varCheck2('type'),
    ],
    'zoom_x':   isNumeric(0, 2000),
    'zoom_y':   isNumeric(0, 2000),
    'transparent': isNumeric(0, 255),
    'blend':    isNumeric(0, 2),
};

validates['picture_move'] = {
    'layer': [
                notEmpty(),
                isNumeric(1, 100)
    ],
    'origin': [
                list('ul', 'center')
    ],
    'type': [
                list('const', 'var')
    ],
    'x': [
                notEmpty(),
                isNumeric(-9999, 9999),
                varCheck2('type'),
    ],
    'y': [
                notEmpty(),
                isNumeric(-9999, 9999),
                varCheck2('type'),
    ],
    'zoom_x':   isNumeric(0, 2000),
    'zoom_y':   isNumeric(0, 2000),
    'transparent': isNumeric(0, 255),
    'blend':    isNumeric(0, 2),
    'time':     isNumeric(1, 600),
    'wait':     isBool()
};

validates['picture_rotation'] = {
    'layer'   : [
                notEmpty(),
                isNumeric(1, 100)
    ],
    'speed':    isNumeric(-90, 90),
};

validates['picture_tone'] = {
    'layer'   : [
                notEmpty(),
                isNumeric(1, 100)
              ],
    'red':      isNumeric(-255, 255),
    'green':    isNumeric(-255, 255),
    'blue':     isNumeric(-255, 255),
    'gray':     isNumeric(0, 255),
    'time':     isNumeric(1, 600),
    'wait':     isBool(),
};

validates['picture_erace'] = {
    'layer': [
                notEmpty(),
                isNumeric(1, 100)
    ],
};

validates['weather'] = {
    'weather':  list('none', 'rain', 'storm', 'snow'),
    'strength': isNumeric(1, 9),
    'time':     isNumeric(0, 600),
    'wait':     isBool(),
};

validates['bgm'] = {
    'volume':   isNumeric(0, 100),
    'pitch':    isNumeric (50, 150),
    'pan':      isNumeric (-100, 100),
};

validates['fadeout_bgm'] = {
    'time':     isNumeric(1, 60)
};

validates['bgs'] = {
    'volume':   isNumeric(0, 100),
    'pitch':    isNumeric(50, 150),
    'pan':      isNumeric (-100, 100),
};

validates['fadeout_bgs'] = {
    'time':     isNumeric(1, 60)
};

validates['me'] = {
    'volume':   isNumeric(0, 100),
    'pitch':    isNumeric(50, 150),
    'pan':      isNumeric (-100, 100),
};

validates['se'] = {
    'volume':   isNumeric(0, 100),
    'pitch':    isNumeric(50, 150),
    'pan':      isNumeric (-100, 100),
};
validates['movie'] = {
    'file':     notEmpty()
};
validates['all_recovery'] = {
    'actor': [
                notEmpty(),
                regCheck(/^[+]{0,1}(var\.){0,1}\d+$/),
                varCheck(/^[+]{0,1}(var\.){0,1}(\d+)$/)
    ]
};

validates['exp'] = {
    'actor': [
                notEmpty(),
                regCheck(/^[+]{0,1}(var\.){0,1}\d+$/),
                varCheck(/^[+]{0,1}(var\.){0,1}(\d+)$/)
    ],
    'value': [
                notEmpty(),
                regCheck(/^[-+]{0,1}(var\.){0,1}\d+$/),
                varCheck(/^[-+]{0,1}(var\.){0,1}(\d+)$/)
    ],
    'message':  isBool()
};

validates['level'] = {
    'actor': [
                notEmpty(),
                regCheck(/^[+]{0,1}(var\.){0,1}\d+$/),
                varCheck(/^[+]{0,1}(var\.){0,1}(\d+)$/)
    ],
    'value': [
                notEmpty(),
                regCheck(/^[-+]{0,1}(var\.){0,1}\d+$/),
                varCheck(/^[-+]{0,1}(var\.){0,1}(\d+)$/)
    ],
    'message':  isBool()
};

validates['capability'] = {
    'actor': [
                notEmpty(),
                regCheck(/^[+]{0,1}(var\.){0,1}\d+$/),
                varCheck(/^[+]{0,1}(var\.){0,1}(\d+)$/)
    ],
    'capability': [
                notEmpty(),
                list('0', '1', '2', '3', '4', '5', '6', '7', 'maxhp', 'maxmp', 'atk', 'def', 'matk', 'mdef', 'agi', 'luk'),
    ],
    'value': [
                notEmpty(),
                regCheck(/^[-+]{0,1}(var\.){0,1}\d+$/),
                varCheck(/^[-+]{0,1}(var\.){0,1}(\d+)$/)
    ]
};

validates['skill'] = {
    'actor': [
                notEmpty(),
                regCheck(/^[+]{0,1}(var\.){0,1}\d+$/),
                varCheck(/^[+]{0,1}(var\.){0,1}(\d+)$/)
    ],
    'value': [
                notEmpty(),
                isNumeric(0),
              //:zeroCheck => []
    ]
};

validates['equip'] = {
    'actor': [
                notEmpty(),
                isNumeric(1),
    ],
    'part': [
                notEmpty(),
                isNumeric(0, 4),
    ],
    'id': [
                notEmpty(),
                isNumeric(0),
    ]
};

validates['name'] = {
    'actor': [
                notEmpty(),
                isNumeric(1)
    ],
    'value':    notEmpty()
};

validates['class'] = {
    'actor': [
                notEmpty(),
                isNumeric(1),
    ],
    'value': [
                notEmpty(),
                isNumeric(1)
    ]
};

validates['nickname'] = {
    'actor': [
                notEmpty(),
                isNumeric(1),
    ],
    'value':    notEmpty()
};


}}
