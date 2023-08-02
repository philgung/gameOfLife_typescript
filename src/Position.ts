export class Position {
    private readonly _position: string;

    constructor(initial: string) {
        this._position = initial;
    }
    
    public toString():string{
        return this._position;
    }

}