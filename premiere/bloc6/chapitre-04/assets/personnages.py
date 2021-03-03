from matplotlib import pyplot, patches
import csv

def extract_from_csv(filename):
    
    fantassins = []
    chevaliers = []

    with open(filename) as csvfile:
        personnagereader = csv.reader(csvfile, delimiter=';')
        personnagereader.__next__()
        for row in personnagereader:
            if row[3] == 'Chevalier':
                chevaliers.append((int(row[1]), int(row[2])))
            else:
                fantassins.append((int(row[1]), int(row[2])))
    return (chevaliers, fantassins)

def show_data_plot(chevaliers, fantassins, cible = None, circle = None, rect = None):

    fig, ax = pyplot.subplots()

    ax.xaxis.set_ticks(range(21))
    ax.yaxis.set_ticks(range(21))

    ax.set_xlabel('Force', fontsize=15)
    ax.set_ylabel('Courage', fontsize=15)
    ax.set_title('Représentation des personnages')

    fdata = ax.scatter(*zip(*fantassins), c = 'tab:orange')
    cdata = ax.scatter(*zip(*chevaliers), c = 'tab:blue')
    if cible is not None:
        cibledata = ax.scatter(cible[0], cible[1], c = 'tab:green')
        pyplot.legend([cdata, fdata, cibledata], ['Chevalier', 'Fantassin', 'Cible'], loc = 'upper right')
        if circle is not None:
            draw_circle = pyplot.Circle(cible, 4.1,fill=False, edgecolor='blue')
            ax.set_aspect(1)
            ax.add_artist(draw_circle)
    else:
        pyplot.legend([cdata, fdata], ['Chevalier', 'Fantassin'], loc = 'upper right')
    
    if rect is not None:
        # Create a Rectangle patch
        rect = patches.Rectangle((rect[0], rect[1]),rect[2],rect[3],linewidth=1,edgecolor='r',facecolor=(1.0, 0.0, 0.0, 0.1))
        # Add the patch to the Axes
        ax.add_patch(rect)
    pyplot.show()

c, f = extract_from_csv('personnages.csv')
show_data_plot(c, f, (5, 12.5), rect=(2.5, 0, 5, 21))