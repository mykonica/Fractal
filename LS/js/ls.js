function randomColor() {
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function lsObject(lsParameters) {
    this.org_x = lsParameters['org']['x'];
    this.org_y = lsParameters['org']['y'];
    this.steps = lsParameters['steps'];
    this.angle = lsParameters['angle'];
    this.initial = lsParameters['initial'];
    this.rules = lsParameters['rules'];
    this.length = lsParameters['length'];

    this.getLSExpression = getLSExpression;

    function getLSExpression() {
        // if (this.expression) {

        // } else {
            this.expression = new String(this.initial);

            for (var stepIndex = 0; stepIndex < this.steps; stepIndex++) {
                for (var ruleIndex = 0; ruleIndex < this.rules.length; ruleIndex++) {
                    var source = this.rules[ruleIndex]['source'];
                    var target = this.rules[ruleIndex]['target'];
                    var cache = new Array();
                    for (var i = 0; i < this.expression.length; i++) {
                        if (this.expression[i] == source) {
                            cache.push(target);
                        } else {
                            cache.push(this.expression[i]);
                        }
                    }

                    this.expression = cache.join('');
                }
            }
        // }

        return this.expression;
    }
}

function paintLS(lsobject) {
    window.context.save();

    var expression = lsobject.getLSExpression();
    console.log(expression);
    var x = 0;
    var y = 0;
    var direction = Math.PI / 2;
    var stack = new Array();

    var delta = Math.PI / 180 * lsobject.angle;
    var length = lsobject.length;

    window.context.translate(window.canvas.width / 2 + lsobject.org_x, lsobject.org_y);

    // if (true) {
    //     window.context.strokeStyle = '#FF00FF';
    //     window.context.moveTo(-200, -2);
    //     window.context.lineTo(200, -2);
    //     window.context.moveTo(0, 0);
    //     window.context.lineTo(0, -800);
    //     window.context.stroke();
    // }



    window.context.fillStyle = 'rgb(255, 0, 0)';
    window.context.strokeStyle = 'rgb(255, 0, 0)';

    window.context.beginPath();
    window.context.moveTo(x, y);
    // if (true) {
    //     window.context.fillStyle = '#FF00FF';
    //     window.context.fillRect(-20, -20, 40, 40);
    // }
    for (var i = 0; i < expression.length; i++) {
        switch (expression[i]) {
            case 'F':
            case 'L':
            case 'R':
                window.context.moveTo(x, window.canvas.height - y);
                x = x + length * Math.cos(direction);
                y = y + length * Math.sin(direction);
                window.context.lineTo(x, window.canvas.height - y);

                break;
            case 'f':
                x = x + length * Math.cos(direction);
                y = y + length * Math.sin(direction);
                break;
            case '+':
                direction += delta;
                break;
            case '-':
                direction -= delta;
                break;
            case '[':
                var status = new Object();
                status.x = x;
                status.y = y;
                status.direction = direction;
                stack.push(status);
                break;
            case ']':
                if (stack.length > 0) {
                    var status = stack.pop();
                    x = status.x;
                    y = status.y;
                    direction = status.direction;
                }
                break;
            default:
                break;
        }
    }

    window.context.stroke();


    //window.context.translate(-window.canvas.width / 2 - org_x, -window.canvas.height + org_y);
    window.context.restore();
}
