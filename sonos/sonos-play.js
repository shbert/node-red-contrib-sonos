<!-- Sonos Play Node -->
<!-- Starts playing the current playlist within a Sonos Play device -->

<script type="text/x-red" data-template-name="sonos-play">

</script>

<!-- Simple Help Text -->
<script type="text/x-red" data-help-name="sonos-play">


</script>

<!-- Registering Sonos Play Node -->
<script type="text/javascript">
    RED.nodes.registerType('sonos-play',{
        category: 'Sonos',
        defaults: {    
            playnode: {value:"", type:"sonos-config"},
            name: {value:""}
        },
        inputs:1,               // set the number of inputs - only 0 or 1
        outputs:0,              // set the number of outputs - 0 to n
        icon: "bridge.png",     // saved in  icons/myicon.png
        color: "#E2D96E", 
        label: function() {
            return this.name || "Play";
        },
        paletteLabel: "Play"
        
    });
</script>