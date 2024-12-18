function Loading() {
    return (
        <>
            <div class='flex space-x-2 justify-center items-center h-screen dark:invert flex-shrink'>
                <span class='sr-only'>Loading...</span>
                <div class='w-4 h-4 mobile:h-4 mobile:w-4 tablet:h-8 tablet:w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div class='w-4 h-4 mobile:h-4 mobile:w-4 tablet:h-8 tablet:w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div class='w-4 h-4 mobile:h-4 mobile:w-4 tablet:h-8 tablet:w-8 bg-white rounded-full animate-bounce'></div>
            </div>
        </>
    );
};
export default Loading