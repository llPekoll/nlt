<div class="bg">

    <div class="">
        <div class="up">
        </div>
        <div class="down  ">
        </div>
    </div>
</div>


<style>
    .bg{
        background: url('3.png');
        content: "rqwerfsfdasdfas";
        height: 446px;
    }
    .up {
        z-index: -1;
        margin-top:446px;
        content: "";
        width: 100%;
        height: 32.6vw;
        position: absolute;
        background: url('1.png') repeat-x;
        background-size: 50%;
        animation: scroll-anim-back 3s linear infinite;
    }
    .down {
        content: "";
        width: 100%;
        height: 32.6vw;
        position: absolute;
        background: url('2.png') repeat-x;
        background-size: 50%;
        animation: scroll-anim 3s linear infinite;
    }
/* sfr support : 0801 82 0036 */
    @keyframes scroll-anim {
        100% {
            background-position: -100% 0;
        }
    }
    @keyframes scroll-anim-back {
        100% {
            background-position: 100% 0;
        }
    }
</style>