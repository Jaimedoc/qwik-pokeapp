import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number | string;
    size?: number;
    backImage?: boolean;
    isVisible?: boolean;
}

export const PokemonImage = component$(({
    id,
    size=200, 
    backImage= true, 
    isVisible=true,
}:Props)=>{

    const imageLoaded = useSignal(false);
    
    
    useTask$(({track})=>{
        track(()=>id);
        imageLoaded.value = true;
    });

    const imageUrl = useComputed$(()=>{
        if(id ==='') return '';
        return (backImage)
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
    })
 
    return(
        <div class="flex items-center justify-center"
            style={{width:`${size}px`, height: `${size}px`}}>
            {!imageLoaded.value && <span>Cargando...</span>}
            
            <img 
                src={imageUrl.value} 
                alt="pokemon sprite" 
                width={`${size}` }
                height={`${size}` }
                onLoad$={ ()=>{
                    //setTimeout(()=>{
                        imageLoaded.value=true;
                    //},2000); 
                }}
                class={[{
                    'hidden':!imageLoaded.value,
                    'brightness-0': !isVisible
                },  'transition-all']}
            />
        </div>
    )
}) 
